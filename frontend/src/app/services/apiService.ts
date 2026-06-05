const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://the-chronicle-finance.onrender.com'
    : 'http://127.0.0.1:8000');

const BASE = API_URL.replace(/\/$/, '');

export const API_BASE_URL = `${BASE}/api`;

export const API_ENDPOINTS = {
  compoundInterest: `${API_BASE_URL}/calculate-compound-interest`,
  dcf: `${API_BASE_URL}/calculate-dcf`,
  monteCarlo: `${API_BASE_URL}/run-monte-carlo`,
  gbm: `${API_BASE_URL}/run-gbm`,
  portfolioOptimization: `${API_BASE_URL}/portfolio-optimization`,
  valueAtRisk: `${API_BASE_URL}/calculate-var`,
  correlation: `${API_BASE_URL}/calculate-correlation`,
  volatility: `${API_BASE_URL}/analyze-volatility`,
  aiInsight: `${API_BASE_URL}/ai-insight`,
  simulations: `${API_BASE_URL}/simulations`,
};

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

interface ApiOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

// Production-safe request wrapper with timeout, retry, and JSON handling
async function apiRequest(endpoint: string, options: ApiOptions = {}): Promise<any> {
  const { timeout = 15000, retries = 3, ...fetchOptions } = options;

  const authHeaders = await getAuthHeaders();
  const headers = { 
    'Content-Type': 'application/json',
    ...authHeaders, 
    ...fetchOptions.headers 
  };

  const isDev = process.env.NODE_ENV !== 'production';

  let attempt = 0;
  
  while (attempt <= retries) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      if (isDev) {
        console.log(`[API REQUEST] ${fetchOptions.method || 'GET'} ${endpoint}`);
        if (fetchOptions.body) console.log(`[API PAYLOAD]`, JSON.parse(fetchOptions.body as string));
      }

      const response = await fetch(endpoint, {
        ...fetchOptions,
        headers,
        signal: controller.signal
      });

      clearTimeout(id);

      // Handle 502, 503, 504 errors which indicate Render cold starts or gateway issues
      if ([502, 503, 504].includes(response.status)) {
        if (attempt < retries) {
          if (isDev) console.warn(`[API WARNING] ${response.status} received. Render might be waking up. Retrying... (${attempt + 1}/${retries})`);
          attempt++;
          // Exponential backoff: 2s, 4s, 8s
          await new Promise(res => setTimeout(res, 2000 * Math.pow(2, attempt - 1)));
          continue;
        }
      }

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (isDev) {
        console.log(`[API RESPONSE] Status: ${response.status}`);
        console.log(`[API BODY]`, data);
      }

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || `Server error: ${response.status}`);
      }

      return data;
      
    } catch (err: any) {
      if (err.name === 'AbortError') {
        if (attempt < retries) {
          if (isDev) console.warn(`[API TIMEOUT] Request timed out. Retrying... (${attempt + 1}/${retries})`);
          attempt++;
          continue;
        }
        throw new Error('Request timed out. The server took too long to respond.');
      }
      
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        if (attempt < retries) {
          if (isDev) console.warn(`[API NETWORK ERROR] Failed to fetch. Retrying... (${attempt + 1}/${retries})`);
          attempt++;
          await new Promise(res => setTimeout(res, 2000 * Math.pow(2, attempt - 1)));
          continue;
        }
        throw new Error(`Failed to connect to backend. Please check your network connection or verify CORS settings.`);
      }

      throw err;
    }
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

    return apiRequest(API_ENDPOINTS.compoundInterest, {
      method: 'POST',
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

    return apiRequest(API_ENDPOINTS.dcf, {
      method: 'POST',
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

    return apiRequest(API_ENDPOINTS.monteCarlo, {
      method: 'POST',
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

    return apiRequest(API_ENDPOINTS.gbm, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Portfolio Optimization
  runPortfolioOptimization: async (data: PortfolioOptData) => {
    return apiRequest(API_ENDPOINTS.portfolioOptimization, {
      method: 'POST',
      body: JSON.stringify({
        num_assets: data.numAssets,
        risk_free_rate: data.riskFreeRate,
        simulations: data.simulations
      }),
    });
  },

  // Value at Risk
  calculateVaR: async (data: VaRData) => {
    return apiRequest(API_ENDPOINTS.valueAtRisk, {
      method: 'POST',
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
    return apiRequest(API_ENDPOINTS.correlation, {
      method: 'POST',
      body: JSON.stringify({
        num_assets: data.numAssets,
        regime: data.regime
      }),
    });
  },

  // Volatility Modeling
  analyzeVolatility: async (data: VolatilityData) => {
    return apiRequest(API_ENDPOINTS.volatility, {
      method: 'POST',
      body: JSON.stringify({
        initial_vol: data.initialVol,
        time_steps: data.timeSteps
      }),
    });
  },

  // Save Simulation
  saveSimulation: async (data: { model_type: string; parameters: any; results: any }) => {
    return apiRequest(API_ENDPOINTS.simulations, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Save Notes for Simulation
  saveNotes: async (simulationId: number, notes: string) => {
    return apiRequest(`${API_ENDPOINTS.simulations}/${simulationId}/notes`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    });
  },

  // Generate AI Insight
  generateAIInsight: async (data: { model_type: string; model_results: any; simulation_id?: number; user_notes?: string }) => {
    return apiRequest(API_ENDPOINTS.aiInsight, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get Simulations
  getSimulations: async (modelType?: string): Promise<SavedSimulation[]> => {
    const url = modelType ? `${API_ENDPOINTS.simulations}?model_type=${modelType}` : API_ENDPOINTS.simulations;
    return apiRequest(url);
  },

  // Get User Simulations
  getUserSimulations: async (userId: string): Promise<SavedSimulation[]> => {
    return apiRequest(`${API_ENDPOINTS.simulations}/user/${userId}`);
  },

  // Get Single Simulation
  getSimulation: async (id: number): Promise<SavedSimulation> => {
    return apiRequest(`${API_ENDPOINTS.simulations}/${id}`);
  },
};
