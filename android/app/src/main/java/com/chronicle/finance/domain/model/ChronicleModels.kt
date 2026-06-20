package com.chronicle.finance.domain.model

data class Simulation(
    val id: Int?,
    val modelType: ChronicleModelType,
    val parameters: Map<String, Any>,
    val results: Map<String, Any>,
    val notes: String?,
    val createdAt: String?
)

enum class ChronicleModelType(val slug: String, val title: String) {
    COMPOUND_INTEREST("compound-interest", "Compound Interest"),
    DCF("discounted-cash-flow", "Discounted Cash Flow"),
    MONTE_CARLO("monte-carlo", "Monte Carlo"),
    GBM("geometric-brownian-motion", "Brownian Motion"),
    PORTFOLIO_OPT("portfolio-optimization", "Portfolio Opt."),
    VAR("value-at-risk", "Value at Risk"),
    CORRELATION("correlation-matrix", "Correlation Lab"),
    VOLATILITY("volatility-lab", "Volatility Lab");

    companion object {
        fun fromSlug(slug: String) = values().find { it.slug == slug } ?: COMPOUND_INTEREST
    }
}
