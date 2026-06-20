package com.chronicle.finance.utils

import java.text.NumberFormat
import java.util.*

object FormatUtils {
    fun formatCurrency(amount: Double): String {
        val format = NumberFormat.getCurrencyInstance(Locale("en", "IN"))
        return format.format(amount)
    }

    fun formatPercent(value: Double): String {
        return "%.2f%%".format(value)
    }
}
