// API response types
export interface CompoundInterestResponse {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  futureValues: Record<string, number>;
  totalCompounded: number;
}

export interface DCFResponse {
  npv: number;
  cashFlows: number[];
  presentValue: number;
  totalValue: number;
  yearlyValues: Record<string, any>;
}

export interface MonteCarloResponse {
  simulations: number[];
  meanValue: number;
  medianValue: number;
  percentiles: Record<string, number>;
}
