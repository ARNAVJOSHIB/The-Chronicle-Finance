package com.chronicle.finance.presentation.shared.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = NeonLime,
    secondary = LedgerGold,
    tertiary = Ivory,
    background = DeepCharcoal,
    surface = DeepCharcoal,
    onPrimary = DeepCharcoal,
    onSecondary = DeepCharcoal,
    onBackground = Ivory,
    onSurface = Ivory,
)

@Composable
fun AurelianTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography,
        content = content
    )
}
