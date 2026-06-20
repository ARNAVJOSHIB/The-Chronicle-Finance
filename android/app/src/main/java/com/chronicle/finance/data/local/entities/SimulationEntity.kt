package com.chronicle.finance.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.chronicle.finance.domain.model.ChronicleModelType
import com.chronicle.finance.domain.model.Simulation

@Entity(tableName = "simulations")
data class SimulationEntity(
    @PrimaryKey val id: Int,
    val modelType: String,
    val parametersJson: String,
    val resultsJson: String,
    val notes: String?,
    val createdAt: String?
)

fun SimulationEntity.toDomain(): Simulation {
    // Note: In real app, use a JSON serializer like Gson or Kotlinx.serialization here
    return Simulation(
        id = id,
        modelType = ChronicleModelType.fromSlug(modelType),
        parameters = emptyMap(), // To be parsed from parametersJson
        results = emptyMap(),    // To be parsed from resultsJson
        notes = notes,
        createdAt = createdAt
    )
}
