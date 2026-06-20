package com.chronicle.finance.data.local.dao

import androidx.room.*
import com.chronicle.finance.data.local.entities.SimulationEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ChronicleDao {
    @Query("SELECT * FROM simulations ORDER BY createdAt DESC")
    fun getAllSimulations(): Flow<List<SimulationEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSimulations(simulations: List<SimulationEntity>)

    @Query("SELECT * FROM simulations WHERE id = :id")
    suspend fun getSimulationById(id: Int): SimulationEntity?

    @Query("DELETE FROM simulations")
    suspend fun clearAll()
}
