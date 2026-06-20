package com.chronicle.finance.navigation

import androidx.compose.runtime.Composable
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.chronicle.finance.presentation.home.HomeScreen
import com.chronicle.finance.presentation.home.HomeViewModel
import com.chronicle.finance.presentation.onboarding.OnboardingScreen
import com.chronicle.finance.presentation.onboarding.OnboardingViewModel
import com.chronicle.finance.presentation.simulation.SimulationScreen
import com.chronicle.finance.presentation.simulation.SimulationViewModel

sealed class Screen(val route: String) {
    object Onboarding : Screen("onboarding")
    object Home : Screen("home")
    object Simulation : Screen("simulation")
    object Wealth : Screen("wealth")
    object AICoach : Screen("ai_coach")
}

@Composable
fun AurelianNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screen.Onboarding.route
    ) {
        composable(Screen.Onboarding.route) {
            val viewModel: OnboardingViewModel = hiltViewModel()
            OnboardingScreen(
                viewModel = viewModel,
                onOnboardingComplete = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Onboarding.route) { inclusive = true }
                    }
                }
            )
        }
        
        composable(Screen.Home.route) {
            val viewModel: HomeViewModel = hiltViewModel()
            HomeScreen(
                viewModel = viewModel,
                onNavigateToMissions = { /* TODO */ },
                onNavigateToWealth = { navController.navigate(Screen.Wealth.route) },
                onNavigateToChronicleLab = { navController.navigate(Screen.Simulation.route) }
            )
        }
        
        composable(Screen.Simulation.route) {
            val viewModel: SimulationViewModel = hiltViewModel()
            SimulationScreen(viewModel = viewModel)
        }
        
        // Add other screens like Wealth and AI Coach...
    }
}
