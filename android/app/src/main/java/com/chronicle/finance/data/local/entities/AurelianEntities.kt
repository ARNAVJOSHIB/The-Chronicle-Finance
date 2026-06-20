package com.chronicle.finance.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "missions")
data class MissionEntity(
    @PrimaryKey val id: String,
    val title: String,
    val objective: String,
    val timeline: String,
    val status: String,
    val progress: Int
)

@Entity(tableName = "habits")
data class HabitEntity(
    @PrimaryKey val id: String,
    val name: String,
    val category: String,
    val streak: Int,
    val lastCompletedDate: String?
)

@Entity(tableName = "assets")
data class AssetEntity(
    @PrimaryKey val id: String,
    val name: String,
    val type: String,
    val value: Double
)

@Entity(tableName = "liabilities")
data class LiabilityEntity(
    @PrimaryKey val id: String,
    val name: String,
    val type: String,
    val amount: Double
)
