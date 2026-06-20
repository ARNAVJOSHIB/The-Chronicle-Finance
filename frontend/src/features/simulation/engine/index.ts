import type { ModelType } from '../types';
import { runCompoundInterest } from '../models/compoundInterest';
import { runDCF } from '../models/dcf';
import { runMonteCarlo } from '../models/monteCarlo';
import { runGBM } from '../models/gbm';
import { runPortfolioOptimization } from '../models/portfolioOptimization';
import { runValueAtRisk } from '../models/valueAtRisk';
import { runCorrelation } from '../models/correlation';
import { runVolatility } from '../models/volatility';

export function runModel(modelType: ModelType, params: any): any {
  switch (modelType) {
    case 'compound-interest':
      return runCompoundInterest(params);
    case 'discounted-cash-flow':
      return runDCF(params);
    case 'monte-carlo':
      return runMonteCarlo(params);
    case 'geometric-brownian-motion':
      return runGBM(params);
    case 'portfolio-optimization':
      return runPortfolioOptimization(params);
    case 'value-at-risk':
      return runValueAtRisk(params);
    case 'correlation-matrix':
      return runCorrelation(params);
    case 'volatility-lab':
      return runVolatility(params);
    default:
      throw new Error(`Unknown model type: ${modelType}`);
  }
}
