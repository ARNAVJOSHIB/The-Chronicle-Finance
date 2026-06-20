package com.chronicle.finance.data.api

import com.chronicle.finance.data.dto.*
import retrofit2.http.*

interface AurelianApiService {

    @POST("onboarding/assessment")
    suspend fun submitAssessment(@Body assessment: AssessmentRequestDto): PersonaResponseDto

    @GET("dashboard/briefing")
    suspend fun getDailyBriefing(): DailyBriefingDto

    @GET("missions")
    suspend fun getMissions(): List<MissionDto>

    @POST("missions")
    suspend fun createMission(@Body mission: MissionDto): MissionDto

    @PATCH("missions/{id}/milestones/{milestoneId}")
    suspend fun updateMilestone(@Path("id") missionId: String, @Path("milestoneId") milestoneId: String, @Body body: Map<String, Boolean>): MissionDto

    @GET("wealth/summary")
    suspend fun getWealthSummary(): WealthSnapshotDto

    @POST("wealth/assets")
    suspend fun addAsset(@Body asset: AssetDto): AssetDto

    @POST("wealth/liabilities")
    suspend fun addLiability(@Body liability: LiabilityDto): LiabilityDto

    @GET("habits")
    suspend fun getHabits(): List<HabitDto>

    @POST("habits/{id}/toggle")
    suspend fun toggleHabit(@Path("id") habitId: String): HabitDto

    @POST("reflection")
    suspend fun submitDailyReflection(@Body reflection: ReflectionRequestDto): Map<String, String>

    @POST("ai-coach/ask")
    suspend fun askAICoach(@Body body: Map<String, String>): Map<String, String>
}
