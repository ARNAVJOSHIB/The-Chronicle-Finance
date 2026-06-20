package com.chronicle.finance.di

import com.chronicle.finance.data.api.AurelianApiService
import com.chronicle.finance.data.api.ChronicleApiService
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    private const val BASE_URL = "https://the-chronicle-finance.onrender.com/api/"

    @Provides
    @Singleton
    fun provideRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Provides
    @Singleton
    fun provideChronicleApiService(retrofit: Retrofit): ChronicleApiService {
        return retrofit.create(ChronicleApiService::class.java)
    }

    @Provides
    @Singleton
    fun provideAurelianApiService(retrofit: Retrofit): AurelianApiService {
        return retrofit.create(AurelianApiService::class.java)
    }
}
