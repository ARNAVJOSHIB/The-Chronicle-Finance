package com.chronicle.finance.presentation.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chronicle.finance.data.dto.DailyBriefingDto
import com.chronicle.finance.domain.model.Mission
import com.chronicle.finance.domain.repository.AurelianRepository
import com.chronicle.finance.domain.usecase.GetDailyBriefingUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val getDailyBriefingUseCase: GetDailyBriefingUseCase,
    private val repository: AurelianRepository
) : ViewModel() {

    private val _briefing = MutableStateFlow<DailyBriefingDto?>(null)
    val briefing = _briefing.asStateFlow()

    private val _missions = MutableStateFlow<List<Mission>>(emptyList())
    val missions = _missions.asStateFlow()

    init {
        fetchData()
    }

    private fun fetchData() {
        viewModelScope.launch {
            try {
                _briefing.value = getDailyBriefingUseCase()
                repository.getMissions().collectLatest {
                    _missions.value = it
                }
            } catch (e: Exception) {
                // Handle error
            }
        }
    }
}
