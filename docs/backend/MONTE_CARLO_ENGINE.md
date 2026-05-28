# CHRONICLE FINANCE
## MONTE_CARLO_ENGINE.md

DOCUMENT TYPE:
Monte Carlo Engine Specification

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. ENGINE OBJECTIVE
==================================================
Visualize the range of possible financial outcomes based on historical volatility and expected returns.

==================================================
2. INPUT PARAMETERS
==================================================
- **Principal**: Starting capital.
- **Expected Return**: Annualized percentage.
- **Volatility**: Annualized standard deviation.
- **Iterations**: Number of simulated paths (Standard: 1,000).
- **Horizon**: Years to simulate.

==================================================
3. CALCULATION METHOD
==================================================
- Use **Geometric Brownian Motion (GBM)** for asset price paths.
- Implementation: `numpy.random.standard_normal` for stochastic noise.
- Vectorized path generation for performance.

==================================================
4. OUTPUT STRUCTURE
==================================================
- **Paths**: Sampling of 5-10 individual trajectories for visualization.
- **Distribution**: Histogram data for final values.
- **Confidence Intervals**: 50%, 90%, and 95% bands.

==================================================
5. VISUALIZATION MAPPING
==================================================
- **The Bubble**: Glow intensity increases with high volatility outcomes.
- **Graphs**: Shaded areas represent confidence bands.

==================================================
END OF DOCUMENT
==================================================
