package com.chronicle.finance.data.local.dao

import androidx.room.*
import com.chronicle.finance.data.local.entities.*
import kotlinx.coroutines.flow.Flow

@Dao
interface AurelianDao {
    @Query("SELECT * FROM missions")
    fun getMissions(): Flow<List<MissionEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMissions(missions: List<MissionEntity>)

    @Query("SELECT * FROM habits")
    fun getHabits(): Flow<List<HabitEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertHabits(habits: List<HabitEntity>)

    @Query("SELECT * FROM assets")
    suspend fun getAssets(): List<AssetEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAsset(asset: AssetEntity)

    @Query("SELECT * FROM liabilities")
    suspend fun getLiabilities(): List<LiabilityEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLiability(liability: LiabilityEntity)
}
