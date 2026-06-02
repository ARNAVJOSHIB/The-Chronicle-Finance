# CHRONICLE FINANCE
## BUBBLE_RENDERING_SYSTEM.md

DOCUMENT TYPE:
Bubble System Technical Specification

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. SYSTEM OBJECTIVE
==================================================
The Bubble represents the "Total Value" of a simulation. Its volume and behavior reflect the financial state.

==================================================
2. GEOMETRY AND MATERIAL
==================================================
- **Geometry**: `IcosahedronGeometry` with high subdivision for smooth displacement.
- **Material**: `MeshStandardMaterial` with custom vertex shaders for "wobble" effects.
- **Opacity**: 0.8 (Glass-like, editorial feel).

==================================================
3. DYNAMIC BEHAVIOR
==================================================
- **Volume**: Scaled based on the current simulation value.
- **Wobble (Volatility)**: Vertex displacement frequency increases as `volatility_score` rises.
- **Glow (Risk)**: Emissive intensity increases during high-risk probability branches.

==================================================
4. INTERACTION
==================================================
- **Raycasting**: Used to detect mouse hover.
- **Reaction**: The bubble "pulses" slightly when hovered, signaling active intelligence.

==================================================
END OF DOCUMENT
==================================================
