'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SimulationContextType {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  timeHorizon: number;
  setTimeHorizon: (years: number) => void;
  results: any;
  setResults: (results: any) => void;
  hasRun: boolean;
  setHasRun: (run: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<string>('compound-interest');
  const [timeHorizon, setTimeHorizon] = useState<number>(5);
  const [results, setResults] = useState<any>(null);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SimulationContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
        timeHorizon,
        setTimeHorizon,
        results,
        setResults,
        hasRun,
        setHasRun,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
