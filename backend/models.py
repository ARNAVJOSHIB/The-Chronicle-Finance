from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
import math
from typing import List, Dict, Any, Optional
import json
from db import get_db_connection, save_simulation_fallback, get_simulations_fallback
from psycopg2.extras import RealDictCursor

# Create a router for the API endpoints
router = APIRouter()

# Data models for requests and responses
class SimulationData(BaseModel):
    id: Optional[int] = None
    user_id: Optional[int] = 1
    model_type: str
    parameters: dict
    results: dict
    notes: Optional[str] = None
    created_at: Optional[str] = None



class User(BaseModel):
    id: int
    username: str
    email: str

class Report(BaseModel):
    id: int
    content: str

class Interpretation(BaseModel):
    id: int
    content: str

# Compound Interest Model
class CompoundInterestRequest(BaseModel):
    principal: float
    annual_rate: float
    monthly_contribution: float
    compounding_frequency: int
    inflation_rate: float
    years: int

class CompoundInterestResponse(BaseModel):
    final_amount: float
    total_contributions: float
    total_interest: float
    future_values: dict
    total_compounded: float

@router.post("/calculate-compound-interest", response_model=CompoundInterestResponse)
def calculate_compound_interest(request: CompoundInterestRequest):
    """
    Calculate compound interest with regular contributions and inflation adjustment.
    Formula: FV = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    """
    r = request.annual_rate / 100
    n = request.compounding_frequency
    t = request.years
    PMT = request.monthly_contribution
    P = request.principal
    
    # Standard formula for monthly contributions with n compounding periods per year
    # If contributions are monthly, and compounding is n times per year, 
    # we usually assume contributions occur at the end of each month.
    # To keep it standard with most financial calculators:
    # We use effective rate per period i = r/n
    i = r / n
    total_periods = n * t
    
    # Since contributions are monthly but compounding might be different, 
    # for simplicity in a business context, we align them to the compounding frequency.
    # However, a common formula for monthly contributions (PMT) with monthly compounding (n=12):
    # FV = P(1+r/12)^(12t) + PMT * [((1+r/12)^(12t) - 1) / (r/12)]
    
    if r == 0:
        final_amount = P + (PMT * 12 * t)
    else:
        # Principal growth
        fv_principal = P * (1 + i)**total_periods
        # Annuity growth (monthly contributions adjusted to periods)
        # If n=12, PMT is per period. If n=1, PMT*12 is per period.
        pmt_per_period = (PMT * 12) / n
        fv_annuity = pmt_per_period * ((1 + i)**total_periods - 1) / i
        final_amount = fv_principal + fv_annuity

    # Calculate total contributions
    total_contributions = PMT * 12 * t

    # Calculate total interest earned
    total_interest = final_amount - P - total_contributions

    # Create future values for each year properly
    future_values = {}
    for year in range(1, t + 1):
        periods = n * year
        if r == 0:
            val = P + (PMT * 12 * year)
        else:
            val = P * (1 + i)**periods + pmt_per_period * ((1 + i)**periods - 1) / i
        future_values[year] = val

    return CompoundInterestResponse(
        final_amount=final_amount,
        total_contributions=total_contributions,
        total_interest=total_interest,
        future_values=future_values,
        total_compounded=final_amount
    )

# Discounted Cash Flow Model
class DCFRequest(BaseModel):
    initial_revenue: float
    revenue_growth_rate: float
    operating_margin: float
    tax_rate: float
    discount_rate: float
    terminal_growth_rate: float
    years: int

class DCFResponse(BaseModel):
    npv: float
    cash_flows: list
    present_value: float
    total_value: float
    yearly_values: dict

@router.post("/calculate-dcf", response_model=DCFResponse)
def calculate_dcf(request: DCFRequest):
    cash_flows = []
    present_values = []
    yearly_values = {}
    
    r = request.discount_rate / 100
    g_terminal = request.terminal_growth_rate / 100
    
    current_revenue = request.initial_revenue
    
    for i in range(1, request.years + 1):
        # Calculate revenue (Year 1 grows from initial_revenue)
        current_revenue *= (1 + request.revenue_growth_rate / 100)
        
        # EBIT
        ebit = current_revenue * (request.operating_margin / 100)
        # After-tax Cash Flow (Simplification for DCF as requested: Revenue - Expenses - Taxes)
        atcf = ebit * (1 - request.tax_rate / 100)
        
        # Discount to Year 0
        pv = atcf / (1 + r)**i
        
        cash_flows.append(atcf)
        present_values.append(pv)
        
        yearly_values[i] = {
            "revenue": current_revenue,
            "operating_income": ebit,
            "after_tax_income": atcf,
            "present_value": pv
        }

    # Terminal Value calculation (Perpetuity Growth Model)
    # TV = CF_n * (1 + g) / (r - g)
    if r > g_terminal and request.years > 0:
        last_cf = cash_flows[-1]
        terminal_value = last_cf * (1 + g_terminal) / (r - g_terminal)
        terminal_pv = terminal_value / (1 + r)**request.years
        npv = sum(present_values) + terminal_pv
    else:
        terminal_pv = 0
        npv = sum(present_values)

    return DCFResponse(
        npv=npv,
        cash_flows=cash_flows,
        present_value=sum(present_values),
        total_value=npv,
        yearly_values=yearly_values
    )

# Monte Carlo Simulation Model
# Monte Carlo Simulation Model (Stochastic DCF)
class MonteCarloRequest(BaseModel):
    initial_revenue: float
    revenue_growth_mean: float
    revenue_growth_std: float
    operating_margin_mean: float
    operating_margin_std: float
    tax_rate: float
    discount_rate: float
    terminal_growth_rate: float
    num_simulations: int
    years: int


class GBMRequest(BaseModel):
    initial_price: float
    drift: float
    volatility: float
    time_horizon_years: float
    steps_per_year: int
    num_simulations: int

class GBMResponse(BaseModel):
    paths: list
    mean_path: list
    upper_band: list
    lower_band: list
    upper_band_68: list
    lower_band_68: list
    time_steps: list

@router.post("/run-gbm", response_model=GBMResponse)
def run_gbm(request: GBMRequest):
    """
    Run Geometric Brownian Motion simulations.
    S_t = S_0 * exp((mu - sigma^2 / 2)t + sigma * W_t)
    """
    S0 = request.initial_price
    mu = request.drift / 100
    sigma = request.volatility / 100
    T = request.time_horizon_years
    N = int(request.steps_per_year * T)
    dt = 1.0 / request.steps_per_year
    M = request.num_simulations
    
    paths = np.zeros((N + 1, M))
    paths[0] = S0
    
    for t in range(1, N + 1):
        Z = np.random.standard_normal(M)
        paths[t] = paths[t - 1] * np.exp((mu - 0.5 * sigma**2) * dt + sigma * math.sqrt(dt) * Z)
        
    time_steps = np.linspace(0, T, N + 1).tolist()
    mean_path = np.mean(paths, axis=1).tolist()
    upper_band = np.percentile(paths, 95, axis=1).tolist()
    lower_band = np.percentile(paths, 5, axis=1).tolist()
    upper_band_68 = np.percentile(paths, 84, axis=1).tolist() # 1 std dev up
    lower_band_68 = np.percentile(paths, 16, axis=1).tolist() # 1 std dev down
    
    return GBMResponse(
        paths=paths.T.tolist(), # Transpose to get list of paths (each path is an array of size N+1)
        mean_path=mean_path,
        upper_band=upper_band,
        lower_band=lower_band,
        upper_band_68=upper_band_68,
        lower_band_68=lower_band_68,
        time_steps=time_steps
    )


class MonteCarloResponse(BaseModel):
    simulations: list
    paths: list
    mean_value: float
    median_value: float
    percentiles: dict

@router.post("/run-monte-carlo", response_model=MonteCarloResponse)
def run_monte_carlo(request: MonteCarloRequest):
    """
    Run a Stochastic DCF Monte Carlo simulation.
    Simulates revenue growth and margins as random variables.
    """
    npv_results = []
    all_paths = []
    
    r = request.discount_rate / 100
    g_terminal = request.terminal_growth_rate / 100
    
    for _ in range(request.num_simulations):
        # Each simulation trial
        trial_pvs = []
        cumulative_pvs = [0]
        current_revenue = request.initial_revenue
        last_cf = 0
        
        for year in range(1, request.years + 1):
            # Sample growth and margin
            growth = np.random.normal(request.revenue_growth_mean / 100, request.revenue_growth_std / 100)
            margin = np.random.normal(request.operating_margin_mean / 100, request.operating_margin_std / 100)
            
            # Apply growth starting Year 1
            current_revenue *= (1 + growth)
            
            ebit = current_revenue * margin
            atcf = ebit * (1 - request.tax_rate / 100)
            
            pv = atcf / (1 + r)**year
            trial_pvs.append(pv)
            cumulative_pvs.append(sum(trial_pvs))
            last_cf = atcf
            
        # Terminal Value for this trial
        if r > g_terminal and request.years > 0:
            tv = last_cf * (1 + g_terminal) / (r - g_terminal)
            tv_pv = tv / (1 + r)**request.years
            trial_npv = sum(trial_pvs) + tv_pv
        else:
            trial_npv = sum(trial_pvs)
            
        cumulative_pvs[-1] = trial_npv # Set final point to full NPV
        npv_results.append(trial_npv)
        all_paths.append(cumulative_pvs)

    # Calculate statistics
    if npv_results:
        mean_value = np.mean(npv_results)
        median_value = np.median(npv_results)
        percentiles = {
            "5%": np.percentile(npv_results, 5),
            "25%": np.percentile(npv_results, 25),
            "50%": median_value,
            "75%": np.percentile(npv_results, 75),
            "95%": np.percentile(npv_results, 95)
        }
    else:
        mean_value = 0
        median_value = 0
        percentiles = {}

    return MonteCarloResponse(
        simulations=npv_results,
        paths=all_paths,
        mean_value=mean_value,
        median_value=median_value,
        percentiles=percentiles
    )

# API endpoint to save a simulation
@router.post("/simulations", response_model=SimulationData)
def save_simulation(simulation: SimulationData):
    """
    Save a simulation to the database.
    """
    conn = get_db_connection()
    if not conn:
        # FALLBACK: Save to JSON file
        try:
            new_simulation = save_simulation_fallback(
                simulation.user_id, 
                simulation.model_type, 
                simulation.parameters, 
                simulation.results
            )
            return SimulationData(**new_simulation)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error saving to fallback: {str(e)}")
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                INSERT INTO simulations (user_id, model_type, parameters, results)
                VALUES (%s, %s, %s, %s)
                RETURNING *
            """, (simulation.user_id, simulation.model_type, json.dumps(simulation.parameters), json.dumps(simulation.results)))
            
            new_simulation = cur.fetchone()
            conn.commit()
            
            # Convert timestamp to string
            if new_simulation and 'created_at' in new_simulation:
                new_simulation['created_at'] = str(new_simulation['created_at'])
                
            return SimulationData(**new_simulation)
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving simulation: {str(e)}")
    finally:
        conn.close()

# API endpoint to get all simulations
@router.get("/simulations", response_model=List[SimulationData])
def get_simulations(model_type: str = None):
    """
    Retrieve all simulations, optionally filtered by model_type.
    """
    conn = get_db_connection()
    if not conn:
        # FALLBACK: Get from JSON file
        try:
            simulations = get_simulations_fallback(model_type)
            return [SimulationData(**sim) for sim in simulations]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching from fallback: {str(e)}")
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            if model_type:
                cur.execute("SELECT * FROM simulations WHERE model_type = %s ORDER BY created_at DESC", (model_type,))
            else:
                cur.execute("SELECT * FROM simulations ORDER BY created_at DESC")
            
            simulations = cur.fetchall()
            
            # Convert timestamps to strings
            for sim in simulations:
                if 'created_at' in sim:
                    sim['created_at'] = str(sim['created_at'])
                    
            return [SimulationData(**sim) for sim in simulations]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching simulations: {str(e)}")
    finally:
        conn.close()

# API endpoint to get a simulation by ID
@router.get("/simulations/{simulation_id}", response_model=SimulationData)
def get_simulation(simulation_id: int):
    """
    Retrieve a simulation by ID from the database.
    """
    # In a real implementation, this would actually retrieve from the database
    # For now, we'll just return a placeholder
    return SimulationData(
        user_id=1,
        model_type="sample",
        parameters={},
        results={}
    )

# API endpoint to get all simulations for a user
@router.get("/simulations/user/{user_id}", response_model=List[SimulationData])
def get_simulations_by_user(user_id: int):
    """
    Retrieve all simulations for a user from the database.
    """
    return []

class NotesUpdate(BaseModel):
    notes: str

@router.patch("/simulations/{simulation_id}/notes")
def update_simulation_notes(simulation_id: int, update: NotesUpdate):
    """
    Update notes for a specific simulation.
    """
    conn = get_db_connection()
    if not conn:
        from db import update_simulation_notes_fallback
        success = update_simulation_notes_fallback(simulation_id, update.notes)
        if not success:
            raise HTTPException(status_code=404, detail="Simulation not found in fallback storage")
        return {"status": "success", "message": "Notes updated in fallback storage"}
        
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE simulations SET notes = %s WHERE id = %s RETURNING id",
                (update.notes, simulation_id)
            )
            if not cur.fetchone():
                conn.rollback()
                raise HTTPException(status_code=404, detail="Simulation not found")
            conn.commit()
            return {"status": "success", "message": "Notes updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating notes: {str(e)}")
    finally:
        conn.close()

# --- NEW QUANT MODELS (PORTFOLIO, VAR, CORRELATION, VOLATILITY) ---

import scipy.optimize as sco

class PortfolioOptRequest(BaseModel):
    num_assets: int = 5
    risk_free_rate: float = 2.0
    simulations: int = 3000

class PortfolioOptResponse(BaseModel):
    assets: list
    expected_returns: list
    volatilities: list
    correlation_matrix: list
    frontier_returns: list
    frontier_volatilities: list
    scatter_returns: list
    scatter_volatilities: list
    scatter_sharpes: list
    max_sharpe_weights: list
    max_sharpe_return: float
    max_sharpe_vol: float
    min_vol_weights: list
    min_vol_return: float
    min_vol_vol: float

@router.post("/portfolio-optimization", response_model=PortfolioOptResponse)
def run_portfolio_optimization(req: PortfolioOptRequest):
    np.random.seed(42)
    n = req.num_assets
    assets = [f"Asset {chr(65+i)}" for i in range(n)]
    
    # Synthetic data
    returns = np.random.uniform(0.03, 0.15, n)
    vols = np.random.uniform(0.10, 0.35, n)
    
    # Random correlation matrix (positive semi-definite)
    A = np.random.randn(n, n)
    cov = np.dot(A, A.transpose())
    d = np.diag(cov)
    corr = cov / np.sqrt(np.outer(d, d))
    
    # Ensure specified volatilities
    cov_matrix = np.outer(vols, vols) * corr
    
    # Monte Carlo Portfolios
    num_ports = req.simulations
    all_weights = np.zeros((num_ports, n))
    ret_arr = np.zeros(num_ports)
    vol_arr = np.zeros(num_ports)
    sharpe_arr = np.zeros(num_ports)
    
    rf = req.risk_free_rate / 100.0
    
    for i in range(num_ports):
        w = np.random.random(n)
        w /= np.sum(w)
        all_weights[i,:] = w
        port_ret = np.sum(returns * w)
        port_vol = np.sqrt(np.dot(w.T, np.dot(cov_matrix, w)))
        ret_arr[i] = port_ret
        vol_arr[i] = port_vol
        sharpe_arr[i] = (port_ret - rf) / port_vol
        
    max_sr_idx = sharpe_arr.argmax()
    max_sr_ret = ret_arr[max_sr_idx]
    max_sr_vol = vol_arr[max_sr_idx]
    max_sr_w = all_weights[max_sr_idx]
    
    min_vol_idx = vol_arr.argmin()
    min_vol_ret = ret_arr[min_vol_idx]
    min_vol_vol = vol_arr[min_vol_idx]
    min_vol_w = all_weights[min_vol_idx]
    
    # Efficient Frontier (Simplified curve points)
    target_returns = np.linspace(min_vol_ret, returns.max(), 30)
    frontier_vols = []
    
    def get_ret_vol_sr(weights):
        w = np.array(weights)
        R = np.sum(returns * w)
        V = np.sqrt(np.dot(w.T, np.dot(cov_matrix, w)))
        SR = (R - rf) / V
        return np.array([R, V, SR])
        
    def minimize_vol(weights):
        return get_ret_vol_sr(weights)[1]
        
    bounds = tuple((0,1) for _ in range(n))
    init_guess = n * [1./n]
    
    for tr in target_returns:
        constraints = ({'type': 'eq', 'fun': lambda x: get_ret_vol_sr(x)[0] - tr},
                       {'type': 'eq', 'fun': lambda x: np.sum(x) - 1})
        res = sco.minimize(minimize_vol, init_guess, method='SLSQP', bounds=bounds, constraints=constraints)
        if res.success:
            frontier_vols.append(res.fun)
        else:
            frontier_vols.append(None)
            
    # Filter out None
    f_ret, f_vol = [], []
    for r, v in zip(target_returns, frontier_vols):
        if v is not None:
            f_ret.append(r)
            f_vol.append(v)
    
    return PortfolioOptResponse(
        assets=assets,
        expected_returns=returns.tolist(),
        volatilities=vols.tolist(),
        correlation_matrix=corr.tolist(),
        frontier_returns=f_ret,
        frontier_volatilities=f_vol,
        scatter_returns=ret_arr.tolist(),
        scatter_volatilities=vol_arr.tolist(),
        scatter_sharpes=sharpe_arr.tolist(),
        max_sharpe_weights=max_sr_w.tolist(),
        max_sharpe_return=max_sr_ret,
        max_sharpe_vol=max_sr_vol,
        min_vol_weights=min_vol_w.tolist(),
        min_vol_return=min_vol_ret,
        min_vol_vol=min_vol_vol
    )


class VaRRequest(BaseModel):
    portfolio_value: float = 1000000.0
    confidence_level: float = 95.0
    mean_return: float = 8.0
    volatility: float = 15.0
    time_horizon_days: int = 1

class VaRResponse(BaseModel):
    parametric_var: float
    monte_carlo_var: float
    historical_var: float
    simulated_losses: list

@router.post("/calculate-var", response_model=VaRResponse)
def calculate_var(req: VaRRequest):
    import scipy.stats as stats
    
    z_score = stats.norm.ppf(req.confidence_level / 100.0)
    mu_daily = (req.mean_return / 100.0) / 252
    sig_daily = (req.volatility / 100.0) / np.sqrt(252)
    
    T = req.time_horizon_days
    
    parametric_var = req.portfolio_value * (z_score * sig_daily * np.sqrt(T) - mu_daily * T)
    
    # Monte Carlo VaR
    np.random.seed(42)
    sims = 10000
    random_returns = np.random.normal(mu_daily * T, sig_daily * np.sqrt(T), sims)
    sim_port_values = req.portfolio_value * (1 + random_returns)
    losses = req.portfolio_value - sim_port_values
    mc_var = np.percentile(losses, req.confidence_level)
    
    # Historical (Synthetic) VaR
    hist_returns = np.random.standard_t(df=4, size=sims) * sig_daily * np.sqrt(T) + mu_daily * T
    hist_losses = req.portfolio_value - req.portfolio_value * (1 + hist_returns)
    hist_var = np.percentile(hist_losses, req.confidence_level)
    
    # Downsample for visualization
    viz_losses = np.random.choice(losses, size=500, replace=False).tolist()
    
    return VaRResponse(
        parametric_var=parametric_var,
        monte_carlo_var=mc_var,
        historical_var=hist_var,
        simulated_losses=viz_losses
    )

class CorrelationRequest(BaseModel):
    num_assets: int = 8
    regime: str = "calm" # calm or stressed

class CorrelationResponse(BaseModel):
    assets: list
    correlation_matrix: list

@router.post("/calculate-correlation", response_model=CorrelationResponse)
def calculate_correlation(req: CorrelationRequest):
    np.random.seed(None)
    n = req.num_assets
    assets = [f"Asset {chr(65+i)}" for i in range(n)]
    
    # Generate base correlation
    A = np.random.randn(n, n)
    if req.regime == "stressed":
        # In stressed regime, correlations tend to converge towards 1
        A += np.ones((n, n)) * 2.5 
    cov = np.dot(A, A.transpose())
    d = np.diag(cov)
    corr = cov / np.sqrt(np.outer(d, d))
    
    return CorrelationResponse(assets=assets, correlation_matrix=corr.tolist())


class VolatilityRequest(BaseModel):
    initial_vol: float = 15.0
    time_steps: int = 252

class VolatilityResponse(BaseModel):
    realized_volatility: list
    regime_flags: list

@router.post("/analyze-volatility", response_model=VolatilityResponse)
def analyze_volatility(req: VolatilityRequest):
    np.random.seed(None)
    steps = req.time_steps
    vols = np.zeros(steps)
    vols[0] = req.initial_vol / 100.0
    
    regime_flags = np.zeros(steps)
    
    # GARCH(1,1) like process
    omega = 0.00001
    alpha = 0.08
    beta = 0.90
    
    current_regime = 0 # 0=calm, 1=stressed
    
    returns = np.zeros(steps)
    for i in range(1, steps):
        # regime shift probability
        if current_regime == 0 and np.random.random() < 0.01:
            current_regime = 1
        elif current_regime == 1 and np.random.random() < 0.05:
            current_regime = 0
            
        regime_flags[i] = current_regime
        
        # if stressed, variance jumps
        shock = np.random.normal(0, vols[i-1])
        if current_regime == 1:
            shock *= 2.5
            
        returns[i] = shock
        vols[i] = np.sqrt(omega + alpha * (returns[i-1]**2) + beta * (vols[i-1]**2))
        
    return VolatilityResponse(
        realized_volatility=(vols * 100).tolist(),
        regime_flags=regime_flags.tolist()
    )