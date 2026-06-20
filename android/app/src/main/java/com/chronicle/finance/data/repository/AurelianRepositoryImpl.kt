package com.chronicle.finance.data.repository

import com.chronicle.finance.data.api.AurelianApiService
import com.chronicle.finance.data.dto.*
import com.chronicle.finance.data.local.dao.AurelianDao
import com.chronicle.finance.data.local.entities.*
import com.chronicle.finance.domain.model.*
import com.chronicle.finance.domain.repository.AurelianRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject

class AurelianRepositoryImpl @Inject constructor(
    private val api: AurelianApiService,
    private val dao: AurelianDao
) : AurelianRepository {

    override suspend fun submitAssessment(answers: List<AssessmentAnswerDto>): UserPersona {
        val response = api.submitAssessment(AssessmentRequestDto(answers))
        return UserPersona(
            type = response.persona,
            wealthScore = response.wealthScore,
            executionScore = response.executionScore,
            growthScore = response.growthScore,
            disciplineScore = response.disciplineScore,
            chronicleScore = response.chronicleScore
        )
    }

    override suspend fun getDailyBriefing() = api.getDailyBriefing()

    override suspend fun getMissions(): Flow<List<Mission>> {
        // Fetch from API and sync with DAO (simplified)
        return dao.getMissions().map { entities -> 
            entities.map { it.toDomain() }
        }
    }

    override suspend fun createMission(mission: Mission): Mission {
        val dto = mission.toDto()
        val saved = api.createMission(dto)
        dao.insertMissions(listOf(saved.toEntity()))
        return saved.toEntity().toDomain()
    }

    override suspend fun updateMilestone(missionId: String, milestoneId: String, isCompleted: Boolean): Mission {
        val updated = api.updateMilestone(missionId, milestoneId, mapOf("is_completed" to isCompleted))
        dao.insertMissions(listOf(updated.toEntity()))
        return updated.toEntity().toDomain()
    }

    override suspend fun getWealthSummary() = api.getWealthSummary()

    override suspend fun addAsset(asset: Asset): Asset {
        val saved = api.addAsset(asset.toDto())
        dao.insertAsset(saved.toEntity())
        return saved.toEntity().toDomain()
    }

    override suspend fun addLiability(liability: Liability): Liability {
        val saved = api.addLiability(liability.toDto())
        dao.insertLiability(saved.toEntity())
        return saved.toEntity().toDomain()
    }

    override suspend fun getHabits(): Flow<List<Habit>> {
        return dao.getHabits().map { entities -> 
            entities.map { it.toDomain() }
        }
    }

    override suspend fun toggleHabit(habitId: String): Habit {
        val updated = api.toggleHabit(habitId)
        dao.insertHabits(listOf(updated.toEntity()))
        return updated.toEntity().toDomain()
    }

    override suspend fun submitDailyReflection(reflection: ReflectionRequestDto): Boolean {
        return try {
            api.submitDailyReflection(reflection)
            true
        } catch (e: Exception) {
            false
        }
    }

    override suspend fun askAICoach(question: String): String {
        return api.askAICoach(mapOf("question" to question))["answer"] ?: "Error communicating with AI Coach"
    }

    // Converters
    private fun MissionEntity.toDomain() = Mission(
        id = id, title = title, objective = objective, timeline = timeline,
        status = MissionStatus.valueOf(status), progress = progress, milestones = emptyList()
    )
    private fun Mission.toDto() = MissionDto(
        id = id, title = title, objective = objective, timeline = timeline,
        status = status.name, progress = progress, milestones = emptyList()
    )
    private fun MissionDto.toEntity() = MissionEntity(
        id = id ?: "", title = title, objective = objective, timeline = timeline,
        status = status, progress = progress
    )
    private fun HabitEntity.toDomain() = Habit(
        id = id, name = name, category = category, streak = streak, isCompletedToday = false
    )
    private fun HabitDto.toEntity() = HabitEntity(
        id = id ?: "", name = name, category = category, streak = streak, lastCompletedDate = null
    )
    private fun Asset.toDto() = AssetDto(id = id, name = name, type = type, value = value)
    private fun AssetDto.toEntity() = AssetEntity(id = id ?: "", name = name, type = type, value = value)
    private fun AssetEntity.toDomain() = Asset(id = id, name = name, type = type, value = value)
    private fun Liability.toDto() = LiabilityDto(id = id, name = name, type = type, amount = amount)
    private fun LiabilityDto.toEntity() = LiabilityEntity(id = id ?: "", name = name, type = type, amount = amount)
    private fun LiabilityEntity.toDomain() = Liability(id = id, name = name, type = type, amount = amount)
}
