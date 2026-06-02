// Type definitions for the financial models
export interface FinancialModel {
  id: string;
  name: string;
  description: string;
  fields: ModelField[];
}

export interface ModelField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'percentage';
  defaultValue: number | string;
  required?: boolean;
}

// Compound Interest Model
export interface CompoundInterestModel {
  principal: number;
  annualRate: number;
  monthlyContribution: number;
  compoundingFrequency: number;
  inflationRate: number;
}

// DCF Model
export interface DCFModel {
  initialRevenue: number;
  revenueGrowthRate: number;
  operatingMargin: number;
  taxRate: number;
  discountRate: number;
  terminalGrowthRate: number;
}

// Monte Carlo Model
export interface MonteCarloModel {
  initialCapital: number;
  expectedReturn: number;
  volatility: number;
  numSimulations: number;
  riskFreeRate: number;
}
