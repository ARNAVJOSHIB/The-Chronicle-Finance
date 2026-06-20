package com.chronicle.finance.di

import android.content.Context
import androidx.room.Room
import com.chronicle.finance.data.local.ChronicleDatabase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideChronicleDatabase(@ApplicationContext context: Context): ChronicleDatabase {
        return Room.databaseBuilder(
            context,
            ChronicleDatabase::class.java,
            "chronicle_db"
        ).build()
    }

    @Provides
    fun provideChronicleDao(db: ChronicleDatabase) = db.chronicleDao

    @Provides
    fun provideAurelianDao(db: ChronicleDatabase) = db.aurelianDao
}
