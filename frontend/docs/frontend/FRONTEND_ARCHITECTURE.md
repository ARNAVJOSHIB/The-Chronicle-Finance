# CHRONICLE FINANCE
## FRONTEND_ARCHITECTURE.md

DOCUMENT TYPE:
Frontend System Architecture

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. PURPOSE OF THIS DOCUMENT
==================================================
This document defines the structural patterns of the Chronicle Finance frontend, built on Next.js 14+.

==================================================
2. TECHNOLOGY CORE
==================================================
- **Framework**: Next.js (App Router).
- **Language**: TypeScript (Strict mode).
- **Styling**: Tailwind CSS (JIT mode).
- **Icons**: Lucide React (editorial style).
- **Components**: Functional components with Hooks.

==================================================
3. DIRECTORY STRUCTURE
==================================================
```
/src
  /app            # Routing and Page Shells
  /components     # Atomic/Molecule/Organism components
    /ui           # Base editorial primitives
    /simulation   # Simulation-specific controls
    /visualization # Charts and Bubble system
  /hooks          # Shared custom hooks
  /store          # Zustand state definitions
  /lib            # Utility functions (formatting, validation)
  /styles         # Global CSS and Tailwind configs
```

==================================================
4. RENDERING STRATEGY
==================================================
- **Static Pages**: About, Archive, Vision (Pre-rendered).
- **Dynamic Pages**: Simulation Reports (ISR - Incremental Static Regeneration).
- **Interactive Layers**: Simulation Panel (Client-side Rendering with hydrated state).

==================================================
5. PERFORMANCE TARGETS
==================================================
- LCP (Largest Contentful Paint): < 1.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

==================================================
END OF DOCUMENT
==================================================
