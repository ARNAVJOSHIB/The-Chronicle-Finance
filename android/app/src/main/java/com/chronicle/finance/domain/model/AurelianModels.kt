package com.chronicle.finance.domain.model

data class UserPersona(
    val type: String,
    val wealthScore: Int,
    val executionScore: Int,
    val growthScore: Int,
    val disciplineScore: Int,
    val chronicleScore: Int
)

data class Mission(
    val id: String?,
    val title: String,
    val objective: String,
    val timeline: String,
    val status: MissionStatus,
    val progress: Int,
    val milestones: List<Milestone>
)

enum class MissionStatus {
    ACTIVE, UPCOMING, COMPLETED
}

data class Milestone(
    val id: String,
    val title: String,
    val isCompleted: Boolean,
    val targetDate: String?
)

data class Habit(
    val id: String?,
    val name: String,
    val category: String,
    val streak: Int,
    val isCompletedToday: Boolean
)

data class Asset(
    val id: String?,
    val name: String,
    val type: String,
    val value: Double
)

data class Liability(
    val id: String?,
    val name: String,
    val type: String,
    val amount: Double
)
