// API service for connecting to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export interface SavedSimulation {
  id: number;
  user_id?: string;
  model_type: string;
  parameters: any;
  results: any;
  created_at: string;
}

// Compound Interest
export interface CompoundInterestData {
  principal: number;
  annualRate: number;
  monthlyContribution: number;
  compoundingFrequency: number;
  inflationRate: number;
  years: number;
}

// DCF Data
export interface DCFData {
  initialRevenue: number;
  revenueGrowthRate: number;
  operatingMargin: number;
  taxRate: number;
  discountRate: number;
  terminalGrowthRate: number;
  years: number;
}

// Monte Carlo Data
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

// Geometric Brownian Motion Data
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

import { createClient } from '@/lib/supabase/client';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    }
  }
  return { 'Content-Type': 'application/json' }
}

// Helper to handle fetch and provide better error messages for connection issues
async function safeFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const authHeaders = await getAuthHeaders();
    const headers = { ...authHeaders, ...options.headers };
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server error: ${response.status}`);
    }
    return await response.json();
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error("Backend server is not running or unreachable. Please ensure the Python server is running on 127.0.0.1:8000.");
    }
    throw err;
  }
}

// API service functions
export const apiService = {
  // Compound Interest
  calculateCompoundInterest: async (data: CompoundInterestData) => {
    const payload = {
      principal: data.principal,
      annual_rate: data.annualRate,
      monthly_contribution: data.monthlyContribution,
      compounding_frequency: data.compoundingFrequency,
      inflation_rate: data.inflationRate,
      years: data.years
    };
    
    return safeFetch('/calculate-compound-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  // DCF
  calculateDCF: async (data: DCFData) => {
    const payload = {
      initial_revenue: data.initialRevenue,
      revenue_growth_rate: data.revenueGrowthRate,
      operating_margin: data.operatingMargin,
      tax_rate: data.taxRate,
      discount_rate: data.discountRate,
      terminal_growth_rate: data.terminalGrowthRate,
      years: data.years
    };

    return safeFetch('/calculate-dcf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  // Monte Carlo
  runMonteCarlo: async (data: MonteCarloData) => {
    const payload = {
      initial_revenue: data.initialRevenue,
      revenue_growth_mean: data.revenueGrowthMean,
      revenue_growth_std: data.revenueGrowthStd,
      operating_margin_mean: data.operatingMarginMean,
      operating_margin_std: data.operatingMarginStd,
      tax_rate: data.taxRate,
      discount_rate: data.discountRate,
      terminal_growth_rate: data.terminalGrowthRate,
      num_simulations: data.numSimulations,
      years: data.years
    };

    return safeFetch('/run-monte-carlo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  // Geometric Brownian Motion
  runGBM: async (data: GBMData) => {
    const payload = {
      initial_price: data.initialPrice,
      drift: data.drift,
      volatility: data.volatility,
      time_horizon_years: data.timeHorizonYears,
      steps_per_year: data.stepsPerYear,
      num_simulations: data.numSimulations
    };

    return safeFetch('/run-gbm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },

  // Portfolio Optimization
  runPortfolioOptimization: async (data: PortfolioOptData) => {
    return safeFetch('/portfolio-optimization', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num_assets: data.numAssets,
        risk_free_rate: data.riskFreeRate,
        simulations: data.simulations
      }),
    });
  },

  // Value at Risk
  calculateVaR: async (data: VaRData) => {
    return safeFetch('/calculate-var', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        portfolio_value: data.portfolioValue,
        confidence_level: data.confidenceLevel,
        mean_return: data.meanReturn,
        volatility: data.volatility,
        time_horizon_days: data.timeHorizonDays
      }),
    });
  },

  // Correlation Matrix
  calculateCorrelation: async (data: CorrelationData) => {
    return safeFetch('/calculate-correlation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        num_assets: data.numAssets,
        regime: data.regime
      }),
    });
  },

  // Volatility Modeling
  analyzeVolatility: async (data: VolatilityData) => {
    return safeFetch('/analyze-volatility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        initial_vol: data.initialVol,
        time_steps: data.timeSteps
      }),
    });
  },

  // Save Simulation
  saveSimulation: async (data: { model_type: string; parameters: any; results: any }) => {
    return safeFetch('/simulations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  // Save Notes for Simulation
  saveNotes: async (simulationId: number, notes: string) => {
    return safeFetch(`/simulations/${simulationId}/notes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    });
  },

  // Get Simulations
  getSimulations: async (modelType?: string): Promise<SavedSimulation[]> => {
    const url = modelType ? `/simulations?model_type=${modelType}` : `/simulations`;
    return safeFetch(url);
  },

  // Get User Simulations
  getUserSimulations: async (userId: string): Promise<SavedSimulation[]> => {
    return safeFetch(`/simulations/user/${userId}`);
  },

  // Get Single Simulation
  getSimulation: async (id: number): Promise<SavedSimulation> => {
    return safeFetch(`/simulations/${id}`);
  },
};
