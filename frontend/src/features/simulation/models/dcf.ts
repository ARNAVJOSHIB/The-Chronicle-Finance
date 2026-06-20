import type { DCFData, DCFResult } from '../types';

export function runDCF(req: DCFData): DCFResult {
  const cash_flows: number[] = [];
  const present_values: number[] = [];
  const yearly_values: Record<number, any> = {};

  const r = req.discountRate / 100;
  const g_terminal = req.terminalGrowthRate / 100;
  
  let current_revenue = req.initialRevenue;
  let last_cf = 0;

  for (let i = 1; i <= req.years; i++) {
    current_revenue *= (1 + req.revenueGrowthRate / 100);
    const ebit = current_revenue * (req.operatingMargin / 100);
    const atcf = ebit * (1 - req.taxRate / 100);
    
    const pv = atcf / Math.pow(1 + r, i);
    
    cash_flows.push(atcf);
    present_values.push(pv);
    last_cf = atcf;
    
    yearly_values[i] = {
      revenue: current_revenue,
      operating_income: ebit,
      after_tax_income: atcf,
      present_value: pv
    };
  }

  const sum_present_values = present_values.reduce((a, b) => a + b, 0);

  let terminal_pv = 0;
  let npv = sum_present_values;
  
  if (r > g_terminal && req.years > 0) {
    const terminal_value = last_cf * (1 + g_terminal) / (r - g_terminal);
    terminal_pv = terminal_value / Math.pow(1 + r, req.years);
    npv += terminal_pv;
  }

  return {
    npv,
    cash_flows,
    present_value: sum_present_values,
    total_value: npv,
    yearly_values
  };
}
