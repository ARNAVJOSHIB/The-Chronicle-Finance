package com.chronicle.finance.domain.usecase

import com.chronicle.finance.data.dto.CompoundInterestRequest
import com.chronicle.finance.domain.model.ChronicleModelType
import com.chronicle.finance.domain.repository.ChronicleRepository
import javax.inject.Inject

class RunSimulationUseCase @Inject constructor(
    private val repository: ChronicleRepository
) {
    suspend operator fun invoke(modelType: ChronicleModelType, parameters: Map<String, Any>): Any {
        return when (modelType) {
            ChronicleModelType.COMPOUND_INTEREST -> {
                val req = CompoundInterestRequest(
                    principal = parameters["principal"] as Double,
                    annualRate = parameters["annual_rate"] as Double,
                    monthlyContribution = parameters["monthly_contribution"] as Double,
                    compoundingFrequency = (parameters["compounding_frequency"] as Number).toInt(),
                    inflationRate = parameters["inflation_rate"] as Double,
                    years = (parameters["years"] as Number).toInt()
                )
                repository.calculateCompoundInterest(req)
            }
            // Other models follow a similar pattern...
            else -> throw IllegalArgumentException("Unsupported model type")
        }
    }
}
