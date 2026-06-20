package com.chronicle.finance

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.rememberNavController
import com.chronicle.finance.navigation.AurelianNavGraph
import com.chronicle.finance.presentation.shared.theme.AurelianTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AurelianTheme {
                val navController = rememberNavController()
                AurelianNavGraph(navController = navController)
            }
        }
    }
}
