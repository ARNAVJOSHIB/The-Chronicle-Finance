package com.chronicle.finance.data.dto

import com.google.gson.annotations.SerializedName

// Assessment & Onboarding
data class AssessmentAnswerDto(
    val category: String,
    val question: String,
    val answer: String
)

data class AssessmentRequestDto(
    val answers: List<AssessmentAnswerDto>
)

data class PersonaResponseDto(
    val persona: String, // Builder, Architect, Strategist, etc.
    @SerializedName("wealth_score") val wealthScore: Int,
    @SerializedName("execution_score") val executionScore: Int,
    @SerializedName("growth_score") val growthScore: Int,
    @SerializedName("discipline_score") val disciplineScore: Int,
    @SerializedName("chronicle_score") val chronicleScore: Int
)

// Missions
data class MissionDto(
    val id: String? = null,
    val title: String,
    val objective: String,
    val timeline: String,
    val status: String, // Active, Upcoming, Completed
    val progress: Int,
    val milestones: List<MilestoneDto>,
    @SerializedName("created_at") val createdAt: String? = null
)

data class MilestoneDto(
    val id: String,
    val title: String,
    @SerializedName("is_completed") val isCompleted: Boolean,
    @SerializedName("target_date") val targetDate: String? = null
)

// Habits
data class HabitDto(
    val id: String? = null,
    val name: String,
    val category: String,
    val frequency: String,
    val streak: Int,
    @SerializedName("is_completed_today") val isCompletedToday: Boolean,
    @SerializedName("completion_history") val completionHistory: List<String> // ISO dates
)

// Wealth (Assets & Liabilities)
data class AssetDto(
    val id: String? = null,
    val name: String,
    val type: String, // Savings, Stocks, SIP, etc.
    val value: Double,
    val currency: String = "INR"
)

data class LiabilityDto(
    val id: String? = null,
    val name: String,
    val type: String, // Credit Card, Loan, etc.
    val amount: Double,
    val currency: String = "INR"
)

data class WealthSnapshotDto(
    @SerializedName("net_worth") val netWorth: Double,
    @SerializedName("savings_rate") val savingsRate: Double,
    @SerializedName("asset_allocation") val assetAllocation: Map<String, Double>,
    @SerializedName("goal_funding_status") val goalFundingStatus: Map<String, Int>
)

// Daily Execution
data class DailyBriefingDto(
    @SerializedName("chronicle_score") val chronicleScore: Int,
    @SerializedName("top_priorities") val topPriorities: List<String>,
    @SerializedName("financial_snapshot") val financialSnapshot: String,
    @SerializedName("ai_insight") val aiInsight: String
)

data class ReflectionRequestDto(
    val accomplishments: List<String>,
    val blockers: List<String>,
    val improvements: String
)
