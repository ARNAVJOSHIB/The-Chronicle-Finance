package com.chronicle.finance.domain.repository

import com.chronicle.finance.data.dto.*
import com.chronicle.finance.domain.model.Simulation
import kotlinx.coroutines.flow.Flow

interface ChronicleRepository {
    suspend fun calculateCompoundInterest(request: CompoundInterestRequest): CompoundInterestResponse
    suspend fun calculateDCF(request: DCFRequest): DCFResponse
    suspend fun runMonteCarlo(request: MonteCarloRequest): MonteCarloResponse
    suspend fun runGBM(request: GBMRequest): GBMResponse
    suspend fun runPortfolioOptimization(request: PortfolioOptRequest): PortfolioOptResponse
    suspend fun calculateVaR(request: VaRRequest): VaRResponse
    suspend fun calculateCorrelation(request: CorrelationRequest): CorrelationResponse
    suspend fun analyzeVolatility(request: VolatilityRequest): VolatilityResponse
    
    suspend fun generateAIInsight(request: AIInsightRequest): AIInsightResponse
    
    suspend fun getSimulations(): List<Simulation>
    suspend fun saveSimulation(simulation: SimulationDto): Simulation
    suspend fun getSimulationById(id: Int): Simulation?
    
    fun getCachedSimulations(): Flow<List<Simulation>>
}
