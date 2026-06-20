package com.chronicle.finance.data.api

import com.chronicle.finance.data.dto.*
import retrofit2.http.*

interface ChronicleApiService {

    @POST("calculate-compound-interest")
    suspend fun calculateCompoundInterest(@Body request: CompoundInterestRequest): CompoundInterestResponse

    @POST("calculate-dcf")
    suspend fun calculateDCF(@Body request: DCFRequest): DCFResponse

    @POST("run-monte-carlo")
    suspend fun runMonteCarlo(@Body request: MonteCarloRequest): MonteCarloResponse

    @POST("run-gbm")
    suspend fun runGBM(@Body request: GBMRequest): GBMResponse

    @POST("portfolio-optimization")
    suspend fun runPortfolioOptimization(@Body request: PortfolioOptRequest): PortfolioOptResponse

    @POST("calculate-var")
    suspend fun calculateVaR(@Body request: VaRRequest): VaRResponse

    @POST("calculate-correlation")
    suspend fun calculateCorrelation(@Body request: CorrelationRequest): CorrelationResponse

    @POST("analyze-volatility")
    suspend fun analyzeVolatility(@Body request: VolatilityRequest): VolatilityResponse

    @POST("ai-insight")
    suspend fun generateAIInsight(@Body request: AIInsightRequest): AIInsightResponse

    @GET("simulations")
    suspend fun getSimulations(@Query("model_type") modelType: String? = null): List<SimulationDto>

    @POST("simulations")
    suspend fun saveSimulation(@Body simulation: SimulationDto): SimulationDto

    @GET("simulations/user/{userId}")
    suspend fun getUserSimulations(@Path("userId") userId: String): List<SimulationDto>

    @PATCH("simulations/{id}/notes")
    suspend fun updateSimulationNotes(@Path("id") id: Int, @Body notes: Map<String, String>): Map<String, String>
}
