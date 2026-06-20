package com.chronicle.finance.presentation.onboarding

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.chronicle.finance.data.dto.AssessmentAnswerDto
import com.chronicle.finance.domain.model.UserPersona
import com.chronicle.finance.domain.repository.AurelianRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class OnboardingViewModel @Inject constructor(
    private val repository: AurelianRepository
) : ViewModel() {

    private val _currentQuestionIndex = MutableStateFlow(0)
    val currentQuestionIndex = _currentQuestionIndex.asStateFlow()

    private val _answers = MutableStateFlow<List<AssessmentAnswerDto>>(emptyList())
    val answers = _answers.asStateFlow()

    private val _persona = MutableStateFlow<UserPersona?>(null)
    val persona = _persona.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading = _isLoading.asStateFlow()

    val questions = listOf(
        Question("Personal", "What is your primary profession?", listOf("Student", "Founder", "Corporate", "Creative")),
        Question("Financial", "How would you describe your risk appetite?", listOf("Conservative", "Moderate", "Aggressive", "Hyper-growth")),
        Question("Goals", "What is your most ambitious financial goal?", listOf("First Crore", "Early Retirement", "Buy a Home", "Build a Startup")),
        // ... in real app, all 25 questions here
    )

    fun answerQuestion(answer: String) {
        val currentQ = questions[_currentQuestionIndex.value]
        val newAnswer = AssessmentAnswerDto(currentQ.category, currentQ.text, answer)
        _answers.value = _answers.value + newAnswer
        
        if (_currentQuestionIndex.value < questions.size - 1) {
            _currentQuestionIndex.value++
        } else {
            submitAssessment()
        }
    }

    private fun submitAssessment() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                val result = repository.submitAssessment(_answers.value)
                _persona.value = result
            } catch (e: Exception) {
                // Handle error
            } finally {
                _isLoading.value = false
            }
        }
    }
}

data class Question(
    val category: String,
    val text: String,
    val options: List<String>
)
