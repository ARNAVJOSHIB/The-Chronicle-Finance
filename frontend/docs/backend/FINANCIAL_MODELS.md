# CHRONICLE FINANCE
## FINANCIAL_MODELS.md

DOCUMENT TYPE:
Financial Mathematical Core Specifications

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. COMPOUND INTEREST MODEL
==================================================
**Formula**: $A = P(1 + r/n)^{nt} + c \left[ \frac{(1 + r/n)^{nt} - 1}{r/n} \right]$
- $P$ = Principal
- $r$ = Annual interest rate
- $n$ = Compounding frequency
- $t$ = Time in years
- $c$ = Recurring contribution

==================================================
2. DISCOUNTED CASH FLOW (DCF)
==================================================
**Intrinsic Value**: $\sum_{t=1}^{n} \frac{CF_t}{(1+r)^t} + \frac{TV}{(1+r)^n}$
- $CF_t$ = Cash flow at time $t$
- $r$ = Discount rate (WACC)
- $TV$ = Terminal Value (using Gordon Growth Model)

==================================================
3. MONTE CARLO SIMULATION
==================================================
**Process**: Geometric Brownian Motion (GBM)
- $S_{t+dt} = S_t \exp((\mu - 0.5\sigma^2)dt + \sigma\sqrt{dt}Z)$
- $\mu$ = Expected return
- $\sigma$ = Volatility
- $Z$ = Random variable from standard normal distribution

==================================================
4. VALIDATION RULES
==================================================
- No negative interest rates allowed in base models.
- Max iterations for Monte Carlo: 10,000 (UI cap).
- Time horizons: 1 - 60 years.

==================================================
END OF DOCUMENT
==================================================
