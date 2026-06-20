package com.chronicle.finance.presentation.home

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Flag
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.chronicle.finance.presentation.shared.theme.*

@Composable
fun HomeScreen(
    viewModel: HomeViewModel,
    onNavigateToMissions: () -> Unit,
    onNavigateToWealth: () -> Unit,
    onNavigateToChronicleLab: () -> Unit
) {
    val briefing by viewModel.briefing.collectAsState()
    val missions by viewModel.missions.collectAsState()

    Scaffold(
        containerColor = DeepCharcoal,
        bottomBar = { /* Bottom Nav would go here */ }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 20.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(24.dp))
                HeaderSection(name = "Arthur")
                Spacer(modifier = Modifier.height(32.dp))
            }

            item {
                ChronicleScoreCard(score = briefing?.chronicleScore ?: 0)
                Spacer(modifier = Modifier.height(32.dp))
            }

            item {
                SectionHeader(title = "TODAY'S TOP 3")
                Spacer(modifier = Modifier.height(12.dp))
                briefing?.topPriorities?.forEach { priority ->
                    PriorityItem(text = priority)
                }
                Spacer(modifier = Modifier.height(32.dp))
            }

            item {
                SectionHeader(title = "ACTIVE MISSIONS", actionText = "See All", onAction = onNavigateToMissions)
                Spacer(modifier = Modifier.height(12.dp))
            }

            items(missions.take(2)) { mission ->
                MissionCard(mission)
                Spacer(modifier = Modifier.height(16.dp))
            }

            item {
                Spacer(modifier = Modifier.height(16.dp))
                SectionHeader(title = "WEALTH SNAPSHOT", actionText = "Details", onAction = onNavigateToWealth)
                Spacer(modifier = Modifier.height(12.dp))
                WealthSnapshotCard(briefing?.financialSnapshot ?: "N/A")
                Spacer(modifier = Modifier.height(32.dp))
            }

            item {
                Button(
                    onClick = onNavigateToChronicleLab,
                    modifier = Modifier.fillMaxWidth().height(56.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = LedgerGold),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("OPEN CHRONICLE LAB", color = DeepCharcoal, fontWeight = FontWeight.Bold)
                }
                Spacer(modifier = Modifier.height(48.dp))
            }
        }
    }
}

@Composable
fun HeaderSection(name: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column {
            Text(text = "Good Morning,", color = Color.White.copy(alpha = 0.6f), fontSize = 14.sp)
            Text(text = name, color = Color.White, fontSize = 28.sp, fontWeight = FontWeight.Bold)
        }
        Surface(
            modifier = Modifier.size(48.dp),
            shape = CircleShape,
            color = SurfaceMuted
        ) {
            // Profile icon
        }
    }
}

@Composable
fun ChronicleScoreCard(score: Int) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(SurfaceMuted, RoundedCornerShape(24.dp))
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(text = "CHRONICLE SCORE", color = LedgerGold, style = MaterialTheme.typography.labelSmall)
            Spacer(modifier = Modifier.height(24.dp))
            Box(contentAlignment = Alignment.Center) {
                Canvas(modifier = Modifier.size(140.dp)) {
                    drawArc(
                        color = Color.White.copy(alpha = 0.1f),
                        startAngle = 0f,
                        sweepAngle = 360f,
                        useCenter = false,
                        style = Stroke(width = 12.dp.toPx(), cap = StrokeCap.Round)
                    )
                    drawArc(
                        brush = Brush.sweepGradient(listOf(NeonLime, Color.Green)),
                        startAngle = -90f,
                        sweepAngle = (score / 100f) * 360f,
                        useCenter = false,
                        style = Stroke(width = 12.dp.toPx(), cap = StrokeCap.Round)
                    )
                }
                Text(text = score.toString(), color = Color.White, fontSize = 48.sp, fontWeight = FontWeight.Black)
            }
            Spacer(modifier = Modifier.height(16.dp))
            Text(text = "You're on a strong path.", color = Color.White.copy(alpha = 0.8f), fontSize = 14.sp)
        }
    }
}

@Composable
fun SectionHeader(title: String, actionText: String? = null, onAction: (() -> Unit)? = null) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(text = title, color = Color.White.copy(alpha = 0.4f), style = MaterialTheme.typography.labelSmall)
        if (actionText != null && onAction != null) {
            Text(
                text = actionText,
                color = NeonLime,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.clickable { onAction() }
            )
        }
    }
}

@Composable
fun PriorityItem(text: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .background(SurfaceMuted.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(modifier = Modifier.size(8.dp).background(NeonLime, CircleShape))
        Spacer(modifier = Modifier.width(16.dp))
        Text(text = text, color = Color.White, fontSize = 14.sp, fontWeight = FontWeight.Medium)
    }
}

@Composable
fun MissionCard(mission: com.chronicle.finance.domain.model.Mission) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, Color.White.copy(alpha = 0.1f), RoundedCornerShape(16.dp))
            .padding(20.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.Flag, contentDescription = null, tint = LedgerGold, modifier = Modifier.size(20.dp))
            Spacer(modifier = Modifier.width(12.dp))
            Text(text = mission.title, color = Color.White, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.weight(1f))
            Text(text = "${mission.progress}%", color = NeonLime, fontWeight = FontWeight.Bold)
        }
        Spacer(modifier = Modifier.height(16.dp))
        LinearProgressIndicator(
            progress = mission.progress / 100f,
            modifier = Modifier.fillMaxWidth().height(4.dp),
            color = NeonLime,
            trackColor = Color.White.copy(alpha = 0.1f),
            strokeCap = StrokeCap.Round
        )
    }
}

@Composable
fun WealthSnapshotCard(summary: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(SurfaceMuted, RoundedCornerShape(16.dp))
            .padding(20.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.AccountBalanceWallet, contentDescription = null, tint = NeonLime, modifier = Modifier.size(32.dp))
        Spacer(modifier = Modifier.width(20.dp))
        Column {
            Text(text = "Net Worth", color = Color.White.copy(alpha = 0.6f), fontSize = 12.sp)
            Text(text = summary, color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Bold)
        }
    }
}
