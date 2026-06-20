package com.chronicle.finance.presentation.simulation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chronicle.finance.domain.model.ChronicleModelType
import com.chronicle.finance.domain.usecase.RunSimulationUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SimulationViewModel @Inject constructor(
    private val runSimulationUseCase: RunSimulationUseCase
) : ViewModel() {

    private val _selectedModel = MutableStateFlow(ChronicleModelType.COMPOUND_INTEREST)
    val selectedModel = _selectedModel.asStateFlow()

    private val _results = MutableStateFlow<Any?>(null)
    val results = _results.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading = _isLoading.asStateFlow()

    fun selectModel(modelType: ChronicleModelType) {
        _selectedModel.value = modelType
        _results.value = null
    }

    fun runSimulation(parameters: Map<String, Any>) {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                val response = runSimulationUseCase(_selectedModel.value, parameters)
                _results.value = response
            } catch (e: Exception) {
                // Handle error
            } finally {
                _isLoading.value = false
            }
        }
    }
}
