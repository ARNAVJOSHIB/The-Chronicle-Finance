package com.chronicle.finance.data.repository

import com.chronicle.finance.data.api.ChronicleApiService
import com.chronicle.finance.data.dto.*
import com.chronicle.finance.data.local.dao.ChronicleDao
import com.chronicle.finance.data.local.entities.SimulationEntity
import com.chronicle.finance.data.local.entities.toDomain
import com.chronicle.finance.domain.model.Simulation
import com.chronicle.finance.domain.repository.ChronicleRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject

class ChronicleRepositoryImpl @Inject constructor(
    private val api: ChronicleApiService,
    private val dao: ChronicleDao
) : ChronicleRepository {

    override suspend fun calculateCompoundInterest(request: CompoundInterestRequest) = api.calculateCompoundInterest(request)
    override suspend fun calculateDCF(request: DCFRequest) = api.calculateDCF(request)
    override suspend fun runMonteCarlo(request: MonteCarloRequest) = api.runMonteCarlo(request)
    override suspend fun runGBM(request: GBMRequest) = api.runGBM(request)
    override suspend fun runPortfolioOptimization(request: PortfolioOptRequest) = api.runPortfolioOptimization(request)
    override suspend fun calculateVaR(request: VaRRequest) = api.calculateVaR(request)
    override suspend fun calculateCorrelation(request: CorrelationRequest) = api.calculateCorrelation(request)
    override suspend fun analyzeVolatility(request: VolatilityRequest) = api.analyzeVolatility(request)
    override suspend fun generateAIInsight(request: AIInsightRequest) = api.generateAIInsight(request)

    override suspend fun getSimulations(): List<Simulation> {
        val simulations = api.getSimulations()
        // Cache them
        val entities = simulations.map { it.toEntity() }
        dao.insertSimulations(entities)
        return entities.map { it.toDomain() }
    }

    override suspend fun saveSimulation(simulation: SimulationDto): Simulation {
        val saved = api.saveSimulation(simulation)
        dao.insertSimulations(listOf(saved.toEntity()))
        return saved.toEntity().toDomain()
    }

    override suspend fun getSimulationById(id: Int): Simulation? {
        return dao.getSimulationById(id)?.toDomain() ?: api.getSimulations().find { it.id == id }?.toEntity()?.toDomain()
    }

    override fun getCachedSimulations(): Flow<List<Simulation>> {
        return dao.getAllSimulations().map { entities -> entities.map { it.toDomain() } }
    }

    // Helper conversion
    private fun SimulationDto.toEntity() = SimulationEntity(
        id = id ?: 0,
        modelType = modelType,
        parametersJson = "", // Should serialize Map to JSON
        resultsJson = "",    // Should serialize Map to JSON
        notes = notes,
        createdAt = createdAt
    )
}
