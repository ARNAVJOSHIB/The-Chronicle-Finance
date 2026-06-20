package com.chronicle.finance.presentation.onboarding

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chronicle.finance.presentation.shared.theme.DeepCharcoal
import com.chronicle.finance.presentation.shared.theme.NeonLime
import com.chronicle.finance.presentation.shared.theme.LedgerGold

@Composable
fun OnboardingScreen(
    viewModel: OnboardingViewModel,
    onOnboardingComplete: () -> Unit
) {
    val currentIndex by viewModel.currentQuestionIndex.collectAsState()
    val persona by viewModel.persona.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(DeepCharcoal)
            .padding(24.dp)
    ) {
        if (persona != null) {
            PersonaResultView(persona!!, onOnboardingComplete)
        } else if (isLoading) {
            CircularProgressIndicator(
                modifier = Modifier.align(Alignment.Center),
                color = NeonLime
            )
        } else {
            val question = viewModel.questions[currentIndex]
            
            Column(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = question.category.uppercase(),
                    color = LedgerGold,
                    style = MaterialTheme.typography.labelSmall,
                    letterSpacing = 2.sp
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Text(
                    text = question.text,
                    color = Color.White,
                    style = MaterialTheme.typography.displayLarge,
                    lineHeight = 40.sp
                )
                
                Spacer(modifier = Modifier.height(48.dp))
                
                question.options.forEach { option ->
                    OptionCard(text = option) {
                        viewModel.answerQuestion(option)
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                }
            }
        }
    }
}

@Composable
fun OptionCard(text: String, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, Color.White.copy(alpha = 0.1f), RoundedCornerShape(12.dp))
            .clickable { onClick() }
            .padding(20.dp)
    ) {
        Text(
            text = text,
            color = Color.White,
            style = MaterialTheme.typography.bodyLarge,
            fontWeight = FontWeight.Medium
        )
    }
}

@Composable
fun PersonaResultView(persona: com.chronicle.finance.domain.model.UserPersona, onComplete: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "IDENTITY GENERATED",
            color = LedgerGold,
            style = MaterialTheme.typography.labelSmall
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = persona.type.uppercase(),
            color = NeonLime,
            style = MaterialTheme.typography.displayLarge,
            fontSize = 48.sp
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        ScoreRow("CHRONICLE SCORE", persona.chronicleScore)
        ScoreRow("WEALTH SCORE", persona.wealthScore)
        ScoreRow("EXECUTION SCORE", persona.executionScore)
        
        Spacer(modifier = Modifier.height(64.dp))
        
        Button(
            onClick = onComplete,
            colors = ButtonDefaults.buttonColors(containerColor = NeonLime),
            shape = RoundedCornerShape(8.dp),
            modifier = Modifier.fillMaxWidth().height(56.dp)
        ) {
            Text("ENTER COMMAND CENTER", color = DeepCharcoal, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
fun ScoreRow(label: String, score: Int) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = Color.White.copy(alpha = 0.6f), style = MaterialTheme.typography.labelSmall)
        Text(text = score.toString(), color = Color.White, fontWeight = FontWeight.Bold)
    }
}
