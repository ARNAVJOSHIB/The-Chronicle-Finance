package com.chronicle.finance.domain.repository

import com.chronicle.finance.data.dto.*
import com.chronicle.finance.domain.model.*
import kotlinx.coroutines.flow.Flow

interface AurelianRepository {
    suspend fun submitAssessment(answers: List<AssessmentAnswerDto>): UserPersona
    suspend fun getDailyBriefing(): DailyBriefingDto
    
    suspend fun getMissions(): Flow<List<Mission>>
    suspend fun createMission(mission: Mission): Mission
    suspend fun updateMilestone(missionId: String, milestoneId: String, isCompleted: Boolean): Mission
    
    suspend fun getWealthSummary(): WealthSnapshotDto
    suspend fun addAsset(asset: Asset): Asset
    suspend fun addLiability(liability: Liability): Liability
    
    suspend fun getHabits(): Flow<List<Habit>>
    suspend fun toggleHabit(habitId: String): Habit
    
    suspend fun submitDailyReflection(reflection: ReflectionRequestDto): Boolean
    suspend fun askAICoach(question: String): String
}
