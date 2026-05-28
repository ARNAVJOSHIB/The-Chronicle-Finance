# CHRONICLE FINANCE
## GRAPH_SYSTEM.md

DOCUMENT TYPE:
D3.js Graph System Specification

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. CORE GRAPHS
==================================================
- **Growth Curve**: Multi-line chart showing Mean vs. Confidence Intervals.
- **Contribution Stack**: Area chart for Principal vs. Interest.
- **Sensitivity Matrix**: Heatmap for DCF valuation ranges.

==================================================
2. EDITORIAL STYLING
==================================================
- **Axes**: Thin Charcoal lines (#1A1A1A).
- **Labels**: Inter Sans, 12px.
- **Curves**: `curveMonotoneX` for smooth but accurate interpolation.
- **Colors**: See `COLOR_SYSTEM.md`.

==================================================
3. INTERACTIVITY
==================================================
- **Crosshair**: Follows the mouse, revealing tooltips for specific time points.
- **Synchronization**: Hovering the graph highlights the corresponding state in the Three.js Bubble.

==================================================
4. PERFORMANCE
==================================================
- Virtualize large datasets (> 1,000 points) by sampling.

==================================================
END OF DOCUMENT
==================================================
