# CHRONICLE FINANCE
## THREEJS_INTEGRATION.md

DOCUMENT TYPE:
Three.js and Next.js Integration Guide

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. TECH STACK
==================================================
- **React Three Fiber (R3F)**: Declarative Three.js for React.
- **Drei**: Helper hooks for R3F.
- **React Three Cannon**: Physics (for particle collisions).

==================================================
2. CANVAS SETUP
==================================================
- The `<Canvas>` should be persistent across page transitions where possible to prevent WebGL context loss.
- Use `framer-motion-3d` to animate Three.js elements using the same motion API as the UI.

==================================================
3. OPTIMIZATION
==================================================
- **Suspense**: Use React Suspense for loading 3D assets.
- **Frame Limiting**: Reduce render loop frequency when the tab is inactive.
- **Adaptive Quality**: Reduce anti-aliasing and shadow resolution on lower-end devices.

==================================================
4. BRIDGE TO UI
==================================================
- Avoid passing massive objects via Props.
- Use Zustand stores with `useRef` and `useFrame` for high-frequency updates to the Bubble geometry.

==================================================
END OF DOCUMENT
==================================================
