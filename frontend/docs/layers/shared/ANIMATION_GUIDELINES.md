# CHRONICLE FINANCE
## ANIMATION_GUIDELINES.md

DOCUMENT TYPE:
Motion and Animation Implementation Guidelines

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. PURPOSE OF THIS DOCUMENT
==================================================

This document provides technical guidelines for implementing motion in Layer 2, ensuring it aligns with the "Cinematic Editorial" vision.

==================================================
2. MOTION TIMING AND EASING
==================================================

- **Standard Duration**: 300ms - 500ms.
- **Easing**: `[0.25, 0.1, 0.25, 1.0]` (Standard Cubic Bezier for smooth editorial feel).
- **Staggering**: Use 0.05s delays between list items to create a "cascading newspaper" reveal.

==================================================
3. BUBBLE SYSTEM ANIMATION (Three.js)
==================================================

The Bubble is a living entity.
- **Ambient State**: Subtle scaling (1.0 to 1.05) over a 4s sine wave.
- **Interaction State**: Immediate reaction to mouse hover with a magnetic pull effect.
- **Simulation State**: Expansion speed is relative to the "Growth" parameter in the model.

==================================================
4. INTERFACE TRANSITIONS (Framer Motion)
==================================================

- **Page In**: Opacity 0 -> 1, Y: 20px -> 0.
- **Page Out**: Opacity 1 -> 0, Y: 0 -> -10px.
- **Panel Reveal**: Use a "wipe" effect from left-to-right or top-to-bottom to mimic physical page turning.

==================================================
5. PARTICLE SYSTEM RULES
==================================================

- **Density**: Max 100 particles per view.
- **Speed**: Extremely slow (drift-like).
- **Color**: Matches the background with 20% opacity.

==================================================
6. ACCESSIBILITY AND PERFORMANCE
==================================================

- **`prefers-reduced-motion`**: Respect this system flag by disabling all non-essential decorative animations.
- **GPU Acceleration**: Always use `transform` and `opacity` for animations to ensure 60FPS on mobile.
- **Lazy Loading**: Do not initialize Three.js scenes until the component is in view.

==================================================
7. FORBIDDEN MOTION
==================================================

- No "Shake" effects on errors.
- No "Pop" or "Bounce" springs (too playful).
- No rapid flashing or strobe effects.

==================================================
END OF DOCUMENT
==================================================
