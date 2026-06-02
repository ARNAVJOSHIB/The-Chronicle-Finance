# CHRONICLE FINANCE
## VISUALIZATION_ARCHITECTURE.md

DOCUMENT TYPE:
Visualization Layer Architecture

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. HYBRID ARCHITECTURE
==================================================
Chronicle Finance uses a dual-engine visualization system:
- **Three.js (The Bubble)**: For immersive, probabilistic, and atmospheric 3D rendering.
- **D3.js (The Data Layer)**: For precision SVG-based charting, axes, and statistical intervals.

==================================================
2. COORDINATION STRATEGY
==================================================
- **Zustand** acts as the bridge. When a user scrubs the timeline, the Zustand `timelineIndex` updates.
- **Three.js** listens to this index to scale the bubble.
- **D3.js** listens to this index to move the focus point on the graph.

==================================================
3. PERFORMANCE REQUIREMENTS
==================================================
- **Target**: 60 FPS.
- **Optimization**: Use `requestAnimationFrame` for Three.js and `transition` for D3.js.
- **Offloading**: Perform heavy data parsing in the Backend or Web Workers.

==================================================
4. ASSET PIPELINE
==================================================
- Textures: Procedural or low-res noise (to maintain editorial look).
- Fonts: Converted to JSON for Three.js 3D text (where applicable).

==================================================
END OF DOCUMENT
==================================================
