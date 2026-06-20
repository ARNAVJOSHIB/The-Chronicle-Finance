import type { CompoundInterestData, CompoundInterestResult } from '../types';

export function runCompoundInterest(req: CompoundInterestData): CompoundInterestResult {
  const r = req.annualRate / 100;
  const n = req.compoundingFrequency;
  const t = req.years;
  const PMT = req.monthlyContribution;
  const P = req.principal;

  const i = r / n;
  const total_periods = n * t;

  let final_amount = 0;
  let pmt_per_period = 0;

  if (r === 0) {
    final_amount = P + PMT * 12 * t;
  } else {
    const fv_principal = P * Math.pow(1 + i, total_periods);
    pmt_per_period = (PMT * 12) / n;
    const fv_annuity = pmt_per_period * (Math.pow(1 + i, total_periods) - 1) / i;
    final_amount = fv_principal + fv_annuity;
  }

  const total_contributions = PMT * 12 * t;
  const total_interest = final_amount - P - total_contributions;

  const future_values: Record<number, number> = {};
  for (let year = 1; year <= t; year++) {
    const periods = n * year;
    let val = 0;
    if (r === 0) {
      val = P + PMT * 12 * year;
    } else {
      val = P * Math.pow(1 + i, periods) + pmt_per_period * (Math.pow(1 + i, periods) - 1) / i;
    }
    future_values[year] = val;
  }

  return {
    final_amount,
    total_contributions,
    total_interest,
    future_values,
    total_compounded: final_amount
  };
}
