package com.chronicle.finance.presentation.simulation

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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
import com.chronicle.finance.domain.model.ChronicleModelType
import com.chronicle.finance.presentation.shared.theme.*

@Composable
fun SimulationScreen(
    viewModel: SimulationViewModel
) {
    val selectedModel by viewModel.selectedModel.collectAsState()
    val results by viewModel.results.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DeepCharcoal)
            .padding(top = 24.dp)
    ) {
        // Model Selection Row
        LazyRow(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(ChronicleModelType.values()) { model ->
                ModelTab(
                    model = model,
                    isSelected = selectedModel == model,
                    onClick = { viewModel.selectModel(model) }
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(horizontal = 20.dp)
        ) {
            item {
                Text(
                    text = selectedModel.title,
                    color = Color.White,
                    style = MaterialTheme.typography.displayLarge,
                    fontSize = 28.sp
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "QUANTITATIVE RESEARCH ENVIRONMENT",
                    color = LedgerGold,
                    style = MaterialTheme.typography.labelSmall
                )
                Spacer(modifier = Modifier.height(32.dp))
            }

            item {
                DynamicInputPanel(selectedModel) { params ->
                    viewModel.runSimulation(params)
                }
                Spacer(modifier = Modifier.height(32.dp))
            }

            item {
                if (isLoading) {
                    Box(modifier = Modifier.fillMaxWidth().height(200.dp), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(color = NeonLime)
                    }
                } else if (results != null) {
                    SimulationResultsView(results!!)
                }
                Spacer(modifier = Modifier.height(48.dp))
            }
        }
    }
}

@Composable
fun ModelTab(model: ChronicleModelType, isSelected: Boolean, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .background(
                if (isSelected) NeonLime else SurfaceMuted,
                RoundedCornerShape(8.dp)
            )
            .clickable { onClick() }
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Text(
            text = model.title,
            color = if (isSelected) DeepCharcoal else Color.White,
            fontWeight = FontWeight.Bold,
            fontSize = 12.sp
        )
    }
}

@Composable
fun DynamicInputPanel(modelType: ChronicleModelType, onRun: (Map<String, Any>) -> Unit) {
    // Simplified: In real app, this would generate fields based on modelType
    val params = remember { mutableStateMapOf<String, Any>() }
    
    // Default mock parameters
    LaunchedEffect(modelType) {
        params.clear()
        when(modelType) {
            ChronicleModelType.COMPOUND_INTEREST -> {
                params["principal"] = 10000.0
                params["annual_rate"] = 12.0
                params["monthly_contribution"] = 500.0
                params["compounding_frequency"] = 12
                params["inflation_rate"] = 6.0
                params["years"] = 10
            }
            else -> {}
        }
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(SurfaceMuted, RoundedCornerShape(16.dp))
            .padding(20.dp)
    ) {
        params.keys.forEach { key ->
            Text(text = key.replace("_", " ").uppercase(), color = Color.White.copy(alpha = 0.4f), style = MaterialTheme.typography.labelSmall)
            // Simplified Input Field
            Text(text = params[key].toString(), color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Medium, modifier = Modifier.padding(vertical = 8.dp))
            Divider(color = Color.White.copy(alpha = 0.1f))
            Spacer(modifier = Modifier.height(16.dp))
        }

        Button(
            onClick = { onRun(params.toMap()) },
            modifier = Modifier.fillMaxWidth().height(50.dp),
            colors = ButtonDefaults.buttonColors(containerColor = NeonLime),
            shape = RoundedCornerShape(8.dp)
        ) {
            Text("EXECUTE SIMULATION", color = DeepCharcoal, fontWeight = FontWeight.ExtraBold)
        }
    }
}

@Composable
fun SimulationResultsView(results: Any) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, LedgerGold.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
            .padding(24.dp)
    ) {
        Text(text = "SIMULATION OUTPUT", color = LedgerGold, style = MaterialTheme.typography.labelSmall)
        Spacer(modifier = Modifier.height(16.dp))
        
        // This is where Vico Charts would go. 
        // For now, a placeholder for the visualization.
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
                .background(Color.Black.copy(alpha = 0.2f), RoundedCornerShape(8.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text(text = "DATA VISUALIZATION ENGINE ACTIVE", color = NeonLime, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        // Display some key metrics
        Text(text = "SUMMARY STATISTICS", color = Color.White.copy(alpha = 0.6f), fontSize = 10.sp)
        Spacer(modifier = Modifier.height(8.dp))
        Text(text = "Final Projected Value: ₹18,45,230", color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.Bold)
    }
}
