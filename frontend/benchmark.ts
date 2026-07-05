import { runModel } from './src/features/simulation/engine/index';

const mcData = {
  initialRevenue: 1000,
  revenueGrowthMean: 5,
  revenueGrowthStd: 2,
  operatingMarginMean: 20,
  operatingMarginStd: 2,
  taxRate: 21,
  discountRate: 10,
  terminalGrowthRate: 2,
  numSimulations: 10000,
  years: 5,
};

const gbmData = {
  initialPrice: 100,
  drift: 5,
  volatility: 20,
  timeHorizonYears: 1,
  stepsPerYear: 252,
  numSimulations: 1000,
};

const varData = {
  portfolioValue: 100000,
  confidenceLevel: 95,
  meanReturn: 5,
  volatility: 20,
  timeHorizonDays: 252,
};

const portData = {
  numAssets: 5,
  riskFreeRate: 2,
  simulations: 3000,
};

function bench(name: string, fn: () => void) {
  const start = Date.now();
  fn();
  const end = Date.now();
  console.log(`${name}: ${end - start}ms`);
}

bench('Monte Carlo', () => runModel('monte-carlo', mcData));
bench('GBM', () => runModel('geometric-brownian-motion', gbmData));
bench('VaR', () => runModel('value-at-risk', varData));
bench('Portfolio', () => runModel('portfolio-optimization', portData));
