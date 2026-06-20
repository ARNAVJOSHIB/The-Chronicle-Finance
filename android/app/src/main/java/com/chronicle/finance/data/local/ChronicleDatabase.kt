package com.chronicle.finance.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.chronicle.finance.data.local.dao.AurelianDao
import com.chronicle.finance.data.local.dao.ChronicleDao
import com.chronicle.finance.data.local.entities.*

@Database(
    entities = [
        SimulationEntity::class,
        MissionEntity::class,
        HabitEntity::class,
        AssetEntity::class,
        LiabilityEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class ChronicleDatabase : RoomDatabase() {
    abstract val chronicleDao: ChronicleDao
    abstract val aurelianDao: AurelianDao
}
