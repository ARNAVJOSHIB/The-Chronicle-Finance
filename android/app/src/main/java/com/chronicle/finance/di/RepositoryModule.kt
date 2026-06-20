package com.chronicle.finance.di

import com.chronicle.finance.data.repository.AurelianRepositoryImpl
import com.chronicle.finance.data.repository.ChronicleRepositoryImpl
import com.chronicle.finance.domain.repository.AurelianRepository
import com.chronicle.finance.domain.repository.ChronicleRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindChronicleRepository(
        chronicleRepositoryImpl: ChronicleRepositoryImpl
    ): ChronicleRepository

    @Binds
    @Singleton
    abstract fun bindAurelianRepository(
        aurelianRepositoryImpl: AurelianRepositoryImpl
    ): AurelianRepository
}
