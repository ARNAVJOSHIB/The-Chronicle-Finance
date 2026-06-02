# CHRONICLE FINANCE
## PARTICLE_ENGINE.md

DOCUMENT TYPE:
Ambient Particle System Documentation

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. THE "DATA DUST" PHILOSOPHY
==================================================
Particles in Chronicle Finance represent "Raw Data" floating in the financial environment. They provide depth and life without being distracting.

==================================================
2. IMPLEMENTATION (Three.js)
==================================================
- **Type**: `Points`.
- **Geometry**: `BufferGeometry` for performance.
- **Material**: `PointsMaterial` with circular alpha map.

==================================================
3. BEHAVIOR
==================================================
- **Motion**: Subtle Brownian motion (drifting).
- **Reaction**: Particles are repelled by the cursor and attracted to the central Bubble during simulation execution.
- **Color**: Matches `ink-light` with low opacity.

==================================================
4. DENSITY CONTROL
==================================================
- **Desktop**: 2,000 particles.
- **Mobile**: 500 particles.
- **Reduced Motion**: 0 particles.

==================================================
END OF DOCUMENT
==================================================
