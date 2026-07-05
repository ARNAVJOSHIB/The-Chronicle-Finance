"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { simulationStore } from '@/features/simulation/persistence/simulationStore';
import { runModel } from '@/features/simulation/engine';
import type { CompoundInterestData, DCFData, MonteCarloData, GBMData } from '@/features/simulation/types';
import { useSimulation } from '../context/SimulationContext';

function DynamicInputContent() {
  const { selectedModel, timeHorizon, setTimeHorizon, setResults, isLoading, setIsLoading, setHasRun } = useSimulation();
  const [error, setError] = useState<string | null>(null);

  // Compound Interest inputs
  const [principal, setPrincipal] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('7');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('12');
  const [inflationRate, setInflationRate] = useState<string>('2.5');

  // DCF inputs
  const [initialRevenue, setInitialRevenue] = useState<string>('1000000');
  const [revenueGrowthRate, setRevenueGrowthRate] = useState<string>('12');
  const [operatingMargin, setOperatingMargin] = useState<string>('18');
  const [taxRate, setTaxRate] = useState<string>('25');
  const [discountRate, setDiscountRate] = useState<string>('10');
  const [terminalGrowthRate, setTerminalGrowthRate] = useState<string>('3');

  // Monte Carlo inputs
  const [mcInitialRevenue, setMcInitialRevenue] = useState<string>('1000000');
  const [mcRevenueGrowthMean, setMcRevenueGrowthMean] = useState<string>('10');
  const [mcRevenueGrowthStd, setMcRevenueGrowthStd] = useState<string>('5');
  const [mcOperatingMarginMean, setMcOperatingMarginMean] = useState<string>('15');
  const [mcOperatingMarginStd, setMcOperatingMarginStd] = useState<string>('3');
  const [mcTaxRate, setMcTaxRate] = useState<string>('25');
  const [mcDiscountRate, setMcDiscountRate] = useState<string>('10');
  const [mcTerminalGrowth, setMcTerminalGrowth] = useState<string>('2');
  const [numSimulations, setNumSimulations] = useState<string>('1000');

  // Geometric Brownian Motion inputs
  const [gbmInitialPrice, setGbmInitialPrice] = useState<string>('100');
  const [gbmDrift, setGbmDrift] = useState<string>('8');
  const [gbmVolatility, setGbmVolatility] = useState<string>('20');
  const [gbmSteps, setGbmSteps] = useState<string>('252'); // Daily steps
  const [gbmSimulations, setGbmSimulations] = useState<string>('100');

  // Portfolio Optimization inputs
  const [portNumAssets, setPortNumAssets] = useState<string>('5');
  const [portRiskFreeRate, setPortRiskFreeRate] = useState<string>('2.0');
  const [portSimulations, setPortSimulations] = useState<string>('3000');

  // Value at Risk inputs
  const [varPortfolioValue, setVarPortfolioValue] = useState<string>('1000000');
  const [varConfidenceLevel, setVarConfidenceLevel] = useState<string>('95');
  const [varMeanReturn, setVarMeanReturn] = useState<string>('8');
  const [varVolatility, setVarVolatility] = useState<string>('15');

  // Correlation Matrix inputs
  const [corrNumAssets, setCorrNumAssets] = useState<string>('8');
  const [corrRegime, setCorrRegime] = useState<string>('calm');

  // Volatility Lab inputs
  const [volInitial, setVolInitial] = useState<string>('15');

  const searchParams = useSearchParams();
  const simId = searchParams.get('sim_id');
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (simId && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      setIsLoading(true);
      simulationStore.getSimulation(Number(simId)).then((sim: any) => {
        const p = sim.parameters;
        if (sim.model_type === 'compound-interest') {
          if (p.principal) setPrincipal(String(p.principal));
          if (p.annualRate) setInterestRate(String(p.annualRate));
          if (p.monthlyContribution) setMonthlyContribution(String(p.monthlyContribution));
          if (p.compoundingFrequency) setCompoundingFrequency(String(p.compoundingFrequency));
          if (p.inflationRate) setInflationRate(String(p.inflationRate));
        } else if (sim.model_type === 'discounted-cash-flow') {
          if (p.initialRevenue) setInitialRevenue(String(p.initialRevenue));
          if (p.revenueGrowthRate) setRevenueGrowthRate(String(p.revenueGrowthRate));
          if (p.operatingMargin) setOperatingMargin(String(p.operatingMargin));
          if (p.taxRate) setTaxRate(String(p.taxRate));
          if (p.discountRate) setDiscountRate(String(p.discountRate));
          if (p.terminalGrowthRate) setTerminalGrowthRate(String(p.terminalGrowthRate));
        } else if (sim.model_type === 'monte-carlo') {
          if (p.initialRevenue) setMcInitialRevenue(String(p.initialRevenue));
          if (p.revenueGrowthMean) setMcRevenueGrowthMean(String(p.revenueGrowthMean));
          if (p.revenueGrowthStd) setMcRevenueGrowthStd(String(p.revenueGrowthStd));
          if (p.operatingMarginMean) setMcOperatingMarginMean(String(p.operatingMarginMean));
          if (p.operatingMarginStd) setMcOperatingMarginStd(String(p.operatingMarginStd));
          if (p.taxRate) setMcTaxRate(String(p.taxRate));
          if (p.discountRate) setMcDiscountRate(String(p.discountRate));
          if (p.terminalGrowthRate) setMcTerminalGrowth(String(p.terminalGrowthRate));
          if (p.numSimulations) setNumSimulations(String(p.numSimulations));
        } else if (sim.model_type === 'geometric-brownian-motion') {
          if (p.initialPrice) setGbmInitialPrice(String(p.initialPrice));
          if (p.drift) setGbmDrift(String(p.drift));
          if (p.volatility) setGbmVolatility(String(p.volatility));
          if (p.stepsPerYear) setGbmSteps(String(p.stepsPerYear));
          if (p.numSimulations) setGbmSimulations(String(p.numSimulations));
        } else if (sim.model_type === 'portfolio-optimization') {
          if (p.numAssets) setPortNumAssets(String(p.numAssets));
          if (p.riskFreeRate) setPortRiskFreeRate(String(p.riskFreeRate));
          if (p.simulations) setPortSimulations(String(p.simulations));
        } else if (sim.model_type === 'value-at-risk') {
          if (p.portfolioValue) setVarPortfolioValue(String(p.portfolioValue));
          if (p.confidenceLevel) setVarConfidenceLevel(String(p.confidenceLevel));
          if (p.meanReturn) setVarMeanReturn(String(p.meanReturn));
          if (p.volatility) setVarVolatility(String(p.volatility));
        } else if (sim.model_type === 'correlation-matrix') {
          if (p.numAssets) setCorrNumAssets(String(p.numAssets));
          if (p.regime) setCorrRegime(String(p.regime));
        } else if (sim.model_type === 'volatility-lab') {
          if (p.initialVol) setVolInitial(String(p.initialVol));
        }

        let th = 5;
        if (p.years) th = p.years;
        else if (p.timeHorizonYears) th = p.timeHorizonYears;
        else if (p.timeHorizonDays) th = p.timeHorizonDays / 252;
        else if (p.timeSteps) th = p.timeSteps / 252;
        setTimeHorizon(th);
        
        setResults({ ...sim.results, modelType: sim.model_type, id: sim.id });
        setHasRun(true);
      }).catch(err => {
        console.error("Failed to load shared simulation:", err);
        setError("Could not load shared simulation. The link might be invalid or expired.");
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [simId, setIsLoading, setResults, setHasRun, setTimeHorizon]);

  const handleRunSimulation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(r => setTimeout(r, 10)); // allow UI to render spinner
      
      switch (selectedModel) {
        case 'compound-interest': {
          const compoundData: CompoundInterestData = {
            principal: parseFloat(principal),
            annualRate: parseFloat(interestRate),
            monthlyContribution: parseFloat(monthlyContribution),
            compoundingFrequency: parseInt(compoundingFrequency),
            inflationRate: parseFloat(inflationRate),
            years: timeHorizon,
          };
          const compoundResult = runModel('compound-interest', compoundData);
          const saved = await simulationStore.saveSimulation({
            model_type: 'compound-interest',
            parameters: compoundData,
            results: compoundResult
          });
          setResults({ ...compoundResult, modelType: 'compound-interest', id: saved.id });
          break;
        }
        case 'discounted-cash-flow': {
          const dcfData: DCFData = {
            initialRevenue: parseFloat(initialRevenue),
            revenueGrowthRate: parseFloat(revenueGrowthRate),
            operatingMargin: parseFloat(operatingMargin),
            taxRate: parseFloat(taxRate),
            discountRate: parseFloat(discountRate),
            terminalGrowthRate: parseFloat(terminalGrowthRate),
            years: timeHorizon,
          };
          const dcfResult = runModel('discounted-cash-flow', dcfData);
          const saved = await simulationStore.saveSimulation({
            model_type: 'discounted-cash-flow',
            parameters: dcfData,
            results: dcfResult
          });
          setResults({ ...dcfResult, modelType: 'discounted-cash-flow', id: saved.id });
          break;
        }
        case 'monte-carlo': {
          const monteCarloData: MonteCarloData = {
            initialRevenue: parseFloat(mcInitialRevenue),
            revenueGrowthMean: parseFloat(mcRevenueGrowthMean),
            revenueGrowthStd: parseFloat(mcRevenueGrowthStd),
            operatingMarginMean: parseFloat(mcOperatingMarginMean),
            operatingMarginStd: parseFloat(mcOperatingMarginStd),
            taxRate: parseFloat(mcTaxRate),
            discountRate: parseFloat(mcDiscountRate),
            terminalGrowthRate: parseFloat(mcTerminalGrowth),
            numSimulations: parseInt(numSimulations),
            years: timeHorizon,
          };
          const monteCarloResult = runModel('monte-carlo', monteCarloData);
          const saved = await simulationStore.saveSimulation({
            model_type: 'monte-carlo',
            parameters: monteCarloData,
            results: monteCarloResult
          });
          setResults({ ...monteCarloResult, modelType: 'monte-carlo', id: saved.id });
          break;
        }
        case 'geometric-brownian-motion': {
          const gbmData: GBMData = {
            initialPrice: parseFloat(gbmInitialPrice),
            drift: parseFloat(gbmDrift),
            volatility: parseFloat(gbmVolatility),
            timeHorizonYears: timeHorizon,
            stepsPerYear: parseInt(gbmSteps),
            numSimulations: parseInt(gbmSimulations),
          };
          const gbmResult = runModel('geometric-brownian-motion', gbmData);
          const saved = await simulationStore.saveSimulation({ model_type: 'geometric-brownian-motion', parameters: gbmData, results: gbmResult });
          setResults({ ...gbmResult, modelType: 'geometric-brownian-motion', id: saved.id });
          break;
        }
        case 'portfolio-optimization': {
          const portData = { numAssets: parseInt(portNumAssets), riskFreeRate: parseFloat(portRiskFreeRate), simulations: parseInt(portSimulations) };
          const portResult = runModel('portfolio-optimization', portData);
          const saved = await simulationStore.saveSimulation({ model_type: 'portfolio-optimization', parameters: portData, results: portResult });
          setResults({ ...portResult, modelType: 'portfolio-optimization', id: saved.id });
          break;
        }
        case 'value-at-risk': {
          const varData = { 
            portfolioValue: parseFloat(varPortfolioValue), 
            confidenceLevel: parseFloat(varConfidenceLevel), 
            meanReturn: parseFloat(varMeanReturn), 
            volatility: parseFloat(varVolatility), 
            timeHorizonDays: timeHorizon * 252 
          };
          const varResult = runModel('value-at-risk', varData);
          const saved = await simulationStore.saveSimulation({ model_type: 'value-at-risk', parameters: varData, results: varResult });
          setResults({ ...varResult, modelType: 'value-at-risk', id: saved.id });
          break;
        }
        case 'correlation-matrix': {
          const corrData = { numAssets: parseInt(corrNumAssets), regime: corrRegime };
          const corrResult = runModel('correlation-matrix', corrData);
          const saved = await simulationStore.saveSimulation({ model_type: 'correlation-matrix', parameters: corrData, results: corrResult });
          setResults({ ...corrResult, modelType: 'correlation-matrix', id: saved.id });
          break;
        }
        case 'volatility-lab': {
          const volData = { 
            initialVol: parseFloat(volInitial), 
            timeSteps: timeHorizon * 252 
          };
          const volResult = runModel('volatility-lab', volData);
          const saved = await simulationStore.saveSimulation({ model_type: 'volatility-lab', parameters: volData, results: volResult });
          setResults({ ...volResult, modelType: 'volatility-lab', id: saved.id });
          break;
        }
        default:
          throw new Error('Please select a simulation model.');
      }
      setHasRun(true);
    } catch (err: any) {
      console.error('Simulation error:', err);
      setError(err.message || 'Failed to connect to the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({
    label,
    value,
    onChange,
    hint,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    hint?: string;
  }) => (
    <div className="flex flex-col gap-1 mb-2">
      <label className="text-[10px] font-bold  tracking-[0.1em] font-label text-ink">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1.5 text-sm font-label text-ink outline-none bg-transparent border-b border-ink/30 transition-all duration-300 focus:border-gold focus:bg-gold/5"
      />
      {hint && <span className="text-[10px] text-ink/60 font-label italic">{hint}</span>}
    </div>
  );

  const modelLabel =
    selectedModel === 'compound-interest' ? 'Compound Interest'
    : selectedModel === 'discounted-cash-flow' ? 'Discounted Cash Flow'
    : selectedModel === 'monte-carlo' ? 'Monte Carlo Simulation'
    : selectedModel === 'geometric-brownian-motion' ? 'Geometric Brownian Motion'
    : selectedModel === 'portfolio-optimization' ? 'Portfolio Optimization'
    : selectedModel === 'value-at-risk' ? 'Value at Risk'
    : selectedModel === 'correlation-matrix' ? 'Correlation Lab'
    : selectedModel === 'volatility-lab' ? 'Volatility Lab'
    : 'Model';

  return (
    <div className="w-full mb-10">
      <div className="editorial-panel p-6 md:p-8 bg-paper-aged shadow-[4px_4px_0_rgba(11,19,32,0.05)] transition-all duration-300 hover:shadow-[6px_6px_0_rgba(11,19,32,0.08)] relative overflow-hidden">
        {/* Subtle noise inside the card for archival feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-parchment/80 to-transparent pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-end justify-between border-b-news-thick border-ink pb-4 mb-8 relative z-10">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-ink-soft font-label mb-1">
              Parameters
            </p>
            <h2 className="text-2xl font-bold font-display tracking-tight text-ink capitalize">
              {modelLabel}
            </h2>
          </div>
          <div className="text-[10px] font-bold font-label tracking-[0.15em]  text-ink hidden md:block">
            {timeHorizon} YEAR{timeHorizon !== 1 ? 'S' : ''} PROJECTION
          </div>
        </div>

        <div className="relative z-10">
        {/* Input grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {selectedModel === 'compound-interest' && (
            <>
              <InputField label="Principal ($)" value={principal} onChange={setPrincipal} hint="Starting investment amount" />
              <InputField label="Annual Rate (%)" value={interestRate} onChange={setInterestRate} hint="Expected annual return" />
              <InputField label="Monthly Contribution ($)" value={monthlyContribution} onChange={setMonthlyContribution} hint="Regular monthly deposit" />
              <InputField label="Compounding Frequency" value={compoundingFrequency} onChange={setCompoundingFrequency} hint="Times compounded per year" />
              <InputField label="Inflation Rate (%)" value={inflationRate} onChange={setInflationRate} hint="Annual inflation adjustment" />
            </>
          )}

          {selectedModel === 'discounted-cash-flow' && (
            <>
              <InputField label="Initial Revenue ($)" value={initialRevenue} onChange={setInitialRevenue} hint="Year 1 base revenue" />
              <InputField label="Revenue Growth (%)" value={revenueGrowthRate} onChange={setRevenueGrowthRate} hint="Annual revenue growth rate" />
              <InputField label="Operating Margin (%)" value={operatingMargin} onChange={setOperatingMargin} hint="EBIT as % of revenue" />
              <InputField label="Tax Rate (%)" value={taxRate} onChange={setTaxRate} hint="Effective corporate tax rate" />
              <InputField label="Discount Rate (%)" value={discountRate} onChange={setDiscountRate} hint="WACC or required return" />
              <InputField label="Terminal Growth (%)" value={terminalGrowthRate} onChange={setTerminalGrowthRate} hint="Long-term perpetuity growth" />
            </>
          )}

          {selectedModel === 'monte-carlo' && (
            <>
              <InputField label="Initial Revenue ($)" value={mcInitialRevenue} onChange={setMcInitialRevenue} hint="Base year revenue" />
              <InputField label="Rev. Growth Mean (%)" value={mcRevenueGrowthMean} onChange={setMcRevenueGrowthMean} hint="Expected average growth" />
              <InputField label="Rev. Growth Vol (%)" value={mcRevenueGrowthStd} onChange={setMcRevenueGrowthStd} hint="Growth standard deviation" />
              <InputField label="Margin Mean (%)" value={mcOperatingMarginMean} onChange={setMcOperatingMarginMean} hint="Expected EBIT margin" />
              <InputField label="Margin Vol (%)" value={mcOperatingMarginStd} onChange={setMcOperatingMarginStd} hint="Margin standard deviation" />
              <InputField label="Tax Rate (%)" value={mcTaxRate} onChange={setMcTaxRate} hint="Corporate tax rate" />
              <InputField label="Discount Rate (%)" value={mcDiscountRate} onChange={setMcDiscountRate} hint="WACC for discounting" />
              <InputField label="Terminal Growth (%)" value={mcTerminalGrowth} onChange={setMcTerminalGrowth} hint="Perpetuity growth rate" />
              <InputField label="Simulations" value={numSimulations} onChange={setNumSimulations} hint="Number of paths" />
            </>
          )}

          {selectedModel === 'geometric-brownian-motion' && (
            <>
              <InputField label="Initial Price ($)" value={gbmInitialPrice} onChange={setGbmInitialPrice} hint="Starting asset price" />
              <InputField label="Drift (%)" value={gbmDrift} onChange={setGbmDrift} hint="Expected annual return (mu)" />
              <InputField label="Volatility (%)" value={gbmVolatility} onChange={setGbmVolatility} hint="Annual standard dev (sigma)" />
              <InputField label="Steps / Year" value={gbmSteps} onChange={setGbmSteps} hint="e.g. 252 for daily, 12 for monthly" />
              <InputField label="Simulations" value={gbmSimulations} onChange={setGbmSimulations} hint="Number of paths to generate" />
            </>
          )}

          {selectedModel === 'portfolio-optimization' && (
            <>
              <InputField label="Number of Assets" value={portNumAssets} onChange={setPortNumAssets} hint="Assets to simulate (e.g. 5)" />
              <InputField label="Risk-Free Rate (%)" value={portRiskFreeRate} onChange={setPortRiskFreeRate} hint="Baseline return for Sharpe" />
              <InputField label="Simulations" value={portSimulations} onChange={setPortSimulations} hint="Monte Carlo portfolios" />
            </>
          )}

          {selectedModel === 'value-at-risk' && (
            <>
              <InputField label="Portfolio Value ($)" value={varPortfolioValue} onChange={setVarPortfolioValue} hint="Current market value" />
              <InputField label="Confidence Level (%)" value={varConfidenceLevel} onChange={setVarConfidenceLevel} hint="E.g., 95 or 99" />
              <InputField label="Mean Return (%)" value={varMeanReturn} onChange={setVarMeanReturn} hint="Annual expected return" />
              <InputField label="Volatility (%)" value={varVolatility} onChange={setVarVolatility} hint="Annual standard deviation" />
            </>
          )}

          {selectedModel === 'correlation-matrix' && (
            <>
              <InputField label="Number of Assets" value={corrNumAssets} onChange={setCorrNumAssets} hint="Matrix dimension" />
              <div className="flex flex-col gap-1 mb-2">
                <label className="text-[10px] font-bold  tracking-[0.1em] font-label text-ink">Market Regime</label>
                <select value={corrRegime} onChange={(e) => setCorrRegime(e.target.value)} className="w-full px-2 py-1 text-sm font-label text-ink outline-none bg-transparent border-b border-ink/30 focus:border-gold focus:bg-gold/5">
                  <option value="calm">Calm (Low Correlation)</option>
                  <option value="stressed">Stressed (High Correlation)</option>
                </select>
                <span className="text-[10px] text-ink/60 font-label italic">Simulate regime shifts</span>
              </div>
            </>
          )}

          {selectedModel === 'volatility-lab' && (
            <>
              <InputField label="Initial Volatility (%)" value={volInitial} onChange={setVolInitial} hint="Starting standard deviation" />
            </>
          )}
        </div>

        {error && (
          <div className="mt-6 p-3 border border-red-900 bg-red-50 text-red-900 text-sm font-label italic">
            <strong>Correction:</strong> {error}
          </div>
        )}

        {/* Execute button */}
        <div className="mt-8 flex justify-end border-t border-ink/20 pt-6">
          <button
            id="execute-simulation-btn"
            onClick={handleRunSimulation}
            disabled={isLoading}
            className="editorial-button flex items-center gap-3 px-8 py-3 text-xs font-bold font-label tracking-[0.15em]  disabled:opacity-50 transition-all duration-500 ease-out focus:outline-none"
          >
            {isLoading ? 'Processing…' : 'Execute Simulation →'}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function DynamicInputPanel() {
  return (
    <Suspense fallback={
      <div className="w-full mb-10 editorial-panel p-6 md:p-8 bg-paper-aged shadow-sm flex flex-col items-center justify-center">
        <div className="font-label text-[10px] tracking-[0.2em] text-ink/60 font-bold">
          LOADING PARAMETERS...
        </div>
      </div>
    }>
      <DynamicInputContent />
    </Suspense>
  );
}
