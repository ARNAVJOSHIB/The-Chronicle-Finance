export type ModelType =
  | 'compound-interest'
  | 'discounted-cash-flow'
  | 'monte-carlo'
  | 'geometric-brownian-motion'
  | 'portfolio-optimization'
  | 'value-at-risk'
  | 'correlation-matrix'
  | 'volatility-lab';

export interface SavedSimulation {
  id: number;
  user_id?: string | null;
  model_type: ModelType;
  parameters: any;
  results: any;
  notes?: string | null;
  created_at: string;
}

// ── Inputs ───────────────────────────────────────────────────────────────────

export interface CompoundInterestData {
  principal: number;
  annualRate: number;
  monthlyContribution: number;
  compoundingFrequency: number;
  inflationRate: number;
  years: number;
}

export interface DCFData {
  initialRevenue: number;
  revenueGrowthRate: number;
  operatingMargin: number;
  taxRate: number;
  discountRate: number;
  terminalGrowthRate: number;
  years: number;
}

export interface MonteCarloData {
  initialRevenue: number;
  revenueGrowthMean: number;
  revenueGrowthStd: number;
  operatingMarginMean: number;
  operatingMarginStd: number;
  taxRate: number;
  discountRate: number;
  terminalGrowthRate: number;
  numSimulations: number;
  years: number;
}

export interface GBMData {
  initialPrice: number;
  drift: number;
  volatility: number;
  timeHorizonYears: number;
  stepsPerYear: number;
  numSimulations: number;
}

export interface PortfolioOptData {
  numAssets: number;
  riskFreeRate: number;
  simulations: number;
  assets?: { name: string; expected_return: number; volatility: number }[];
}

export interface VaRData {
  portfolioValue: number;
  confidenceLevel: number;
  meanReturn: number;
  volatility: number;
  timeHorizonDays: number;
}

export interface CorrelationData {
  numAssets: number;
  regime: string;
}

export interface VolatilityData {
  initialVol: number;
  timeSteps: number;
}

// ── Outputs (Snake Case matching Python backend) ──────────────────────────────

export interface CompoundInterestResult {
  final_amount: number;
  total_contributions: number;
  total_interest: number;
  future_values: Record<number, number>;
  total_compounded: number;
}

export interface DCFResult {
  npv: number;
  cash_flows: number[];
  present_value: number;
  total_value: number;
  yearly_values: Record<number, any>;
}

export interface MonteCarloResult {
  simulations: number[];
  paths: number[][];
  mean_value: number;
  median_value: number;
  percentiles: Record<string, number>;
}

export interface GBMResult {
  paths: number[][];
  mean_path: number[];
  upper_band: number[];
  lower_band: number[];
  upper_band_68: number[];
  lower_band_68: number[];
  time_steps: number[];
}

export interface PortfolioOptResult {
  assets: string[];
  expected_returns: number[];
  volatilities: number[];
  correlation_matrix: number[][];
  frontier_returns: number[];
  frontier_volatilities: number[];
  scatter_returns: number[];
  scatter_volatilities: number[];
  scatter_sharpes: number[];
  max_sharpe_weights: number[];
  max_sharpe_return: number;
  max_sharpe_vol: number;
  min_vol_weights: number[];
  min_vol_return: number;
  min_vol_vol: number;
  is_demo: boolean;
}

export interface VaRResult {
  parametric_var: number;
  monte_carlo_var: number;
  historical_var: number;
  simulated_losses: number[];
}

export interface CorrelationResult {
  assets: string[];
  correlation_matrix: number[][];
}

export interface VolatilityResult {
  realized_volatility: number[];
  regime_flags: number[];
}
