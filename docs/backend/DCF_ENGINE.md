# CHRONICLE FINANCE
## DCF_ENGINE.md

DOCUMENT TYPE:
Discounted Cash Flow Engine Specification

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. ENGINE OBJECTIVE
==================================================
Estimate the intrinsic value of an asset or business based on future cash flow projections.

==================================================
2. INPUT PARAMETERS
==================================================
- **Initial Cash Flow**: Year 0 starting point.
- **Growth Rate (Stage 1)**: Annual growth for the first 5-10 years.
- **Discount Rate (WACC)**: The required rate of return.
- **Terminal Growth Rate**: Perpetual growth rate (usually 2-3%).

==================================================
3. CALCULATION METHOD
==================================================
- **Stage 1**: $PV = \sum \frac{CF_0 \times (1+g)^t}{(1+r)^t}$
- **Stage 2 (Terminal)**: $PV_{terminal} = \frac{CF_n \times (1+g_{perm})}{(r - g_{perm})} \times \frac{1}{(1+r)^n}$

==================================================
4. OUTPUT STRUCTURE
==================================================
- **Intrinsic Value**: Single dollar amount.
- **Cash Flow Timeline**: Year-by-year breakdown.
- **Sensitivity Table**: Valuation matrix based on varying Discount Rates vs. Growth Rates.

==================================================
5. VISUALIZATION MAPPING
==================================================
- **The Bubble**: Size represents the Intrinsic Value relative to current market price (if provided).
- **Graphs**: Bar charts for projected cash flows.

==================================================
END OF DOCUMENT
==================================================
