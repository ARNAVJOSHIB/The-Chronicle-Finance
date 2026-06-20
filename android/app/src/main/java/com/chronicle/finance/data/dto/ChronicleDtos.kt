package com.chronicle.finance.data.dto

import com.google.gson.annotations.SerializedName

// Common Simulation Data
data class SimulationDto(
    val id: Int? = null,
    @SerializedName("user_id") val userId: String? = null,
    @SerializedName("model_type") val modelType: String,
    val parameters: Map<String, Any>,
    val results: Map<String, Any>,
    val notes: String? = null,
    @SerializedName("created_at") val createdAt: String? = null
)

// Compound Interest
data class CompoundInterestRequest(
    val principal: Double,
    @SerializedName("annual_rate") val annualRate: Double,
    @SerializedName("monthly_contribution") val monthlyContribution: Double,
    @SerializedName("compounding_frequency") val compoundingFrequency: Int,
    @SerializedName("inflation_rate") val inflationRate: Double,
    val years: Int
)

data class CompoundInterestResponse(
    @SerializedName("final_amount") val finalAmount: Double,
    @SerializedName("total_contributions") val totalContributions: Double,
    @SerializedName("total_interest") val totalInterest: Double,
    @SerializedName("future_values") val futureValues: Map<String, Double>,
    @SerializedName("total_compounded") val totalCompounded: Double
)

// DCF
data class DCFRequest(
    @SerializedName("initial_revenue") val initialRevenue: Double,
    @SerializedName("revenue_growth_rate") val revenueGrowthRate: Double,
    @SerializedName("operating_margin") val operatingMargin: Double,
    @SerializedName("tax_rate") val taxRate: Double,
    @SerializedName("discount_rate") val discountRate: Double,
    @SerializedName("terminal_growth_rate") val terminalGrowthRate: Double,
    val years: Int
)

data class DCFResponse(
    val npv: Double,
    @SerializedName("cash_flows") val cashFlows: List<Double>,
    @SerializedName("present_value") val presentValue: Double,
    @SerializedName("total_value") val totalValue: Double,
    @SerializedName("yearly_values") val yearlyValues: Map<String, Map<String, Double>>
)

// Monte Carlo
data class MonteCarloRequest(
    @SerializedName("initial_revenue") val initialRevenue: Double,
    @SerializedName("revenue_growth_mean") val revenueGrowthMean: Double,
    @SerializedName("revenue_growth_std") val revenueGrowthStd: Double,
    @SerializedName("operating_margin_mean") val operatingMarginMean: Double,
    @SerializedName("operating_margin_std") val operatingMarginStd: Double,
    @SerializedName("tax_rate") val taxRate: Double,
    @SerializedName("discount_rate") val discountRate: Double,
    @SerializedName("terminal_growth_rate") val terminalGrowthRate: Double,
    @SerializedName("num_simulations") val numSimulations: Int,
    val years: Int
)

data class MonteCarloResponse(
    val simulations: List<Double>,
    val paths: List<List<Double>>,
    @SerializedName("mean_value") val meanValue: Double,
    @SerializedName("median_value") val medianValue: Double,
    val percentiles: Map<String, Double>
)

// GBM
data class GBMRequest(
    @SerializedName("initial_price") val initialPrice: Double,
    val drift: Double,
    val volatility: Double,
    @SerializedName("time_horizon_years") val timeHorizonYears: Double,
    @SerializedName("steps_per_year") val stepsPerYear: Int,
    @SerializedName("num_simulations") val numSimulations: Int
)

data class GBMResponse(
    val paths: List<List<Double>>,
    @SerializedName("mean_path") val meanPath: List<Double>,
    @SerializedName("upper_band") val upperBand: List<Double>,
    @SerializedName("lower_band") val lowerBand: List<Double>,
    @SerializedName("upper_band_68") val upperBand68: List<Double>,
    @SerializedName("lower_band_68") val lowerBand68: List<Double>,
    @SerializedName("time_steps") val timeSteps: List<Double>
)

// Portfolio Optimization
data class AssetInput(
    val name: String,
    @SerializedName("expected_return") val expectedReturn: Double,
    val volatility: Double
)

data class PortfolioOptRequest(
    val assets: List<AssetInput>? = null,
    @SerializedName("num_assets") val numAssets: Int = 5,
    @SerializedName("risk_free_rate") val riskFreeRate: Double = 2.0,
    val simulations: Int = 3000
)

data class PortfolioOptResponse(
    val assets: List<String>,
    @SerializedName("expected_returns") val expectedReturns: List<Double>,
    val volatilities: List<Double>,
    @SerializedName("correlation_matrix") val correlationMatrix: List<List<Double>>,
    @SerializedName("frontier_returns") val frontierReturns: List<Double>,
    @SerializedName("frontier_volatilities") val frontierVolatilities: List<Double>,
    @SerializedName("scatter_returns") val scatterReturns: List<Double>,
    @SerializedName("scatter_volatilities") val scatterVolatilities: List<Double>,
    @SerializedName("scatter_sharpes") val scatterSharpes: List<Double>,
    @SerializedName("max_sharpe_weights") val maxSharpeWeights: List<Double>,
    @SerializedName("max_sharpe_return") val maxSharpeReturn: Double,
    @SerializedName("max_sharpe_vol") val maxSharpeVol: Double,
    @SerializedName("min_vol_weights") val minVolWeights: List<Double>,
    @SerializedName("min_vol_return") val minVolReturn: Double,
    @SerializedName("min_vol_vol") val minVolVol: Double,
    @SerializedName("is_demo") val isDemo: Boolean
)

// VaR
data class VaRRequest(
    @SerializedName("portfolio_value") val portfolioValue: Double,
    @SerializedName("confidence_level") val confidenceLevel: Double,
    @SerializedName("mean_return") val meanReturn: Double,
    val volatility: Double,
    @SerializedName("time_horizon_days") val timeHorizonDays: Int
)

data class VaRResponse(
    @SerializedName("parametric_var") val parametricVar: Double,
    @SerializedName("monte_carlo_var") val monteCarloVar: Double,
    @SerializedName("historical_var") val historicalVar: Double,
    @SerializedName("simulated_losses") val simulatedLosses: List<Double>
)

// Correlation
data class CorrelationRequest(
    @SerializedName("num_assets") val numAssets: Int = 8,
    val regime: String = "calm"
)

data class CorrelationResponse(
    val assets: List<String>,
    @SerializedName("correlation_matrix") val correlationMatrix: List<List<Double>>
)

// Volatility
data class VolatilityRequest(
    @SerializedName("initial_vol") val initialVol: Double = 15.0,
    @SerializedName("time_steps") val timeSteps: Int = 252
)

data class VolatilityResponse(
    @SerializedName("realized_volatility") val realizedVolatility: List<Double>,
    @SerializedName("regime_flags") val regimeFlags: List<Int>
)

// AI Insight
data class AIInsightRequest(
    @SerializedName("model_type") val modelType: String,
    @SerializedName("model_results") val modelResults: Map<String, Any>,
    @SerializedName("user_id") val userId: String? = null,
    @SerializedName("simulation_id") val simulationId: Int? = null,
    @SerializedName("user_notes") val userNotes: String? = null
)

data class AIInsightResponse(
    val insight: String,
    @SerializedName("generated_at") val generatedAt: String
)
