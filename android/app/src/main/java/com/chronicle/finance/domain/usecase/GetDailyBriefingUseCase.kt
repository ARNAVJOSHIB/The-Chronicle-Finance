package com.chronicle.finance.domain.usecase

import com.chronicle.finance.data.dto.DailyBriefingDto
import com.chronicle.finance.domain.repository.AurelianRepository
import javax.inject.Inject

class GetDailyBriefingUseCase @Inject constructor(
    private val repository: AurelianRepository
) {
    suspend operator fun invoke(): DailyBriefingDto {
        return repository.getDailyBriefing()
    }
}
