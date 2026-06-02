# CHRONICLE FINANCE
## STATE_MANAGEMENT.md

DOCUMENT TYPE:
Frontend State Management Strategy

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. OVERVIEW
==================================================
Chronicle Finance uses a hybrid state management strategy to handle the complex needs of financial simulations and immersive UI.

==================================================
2. GLOBAL UI STATE (Zustand)
==================================================
**Store: `useSimulationStore`**
- `activeModel`: String (e.g., "DCF").
- `parameters`: Object (Input field values).
- `simulationResult`: JSON (Data returned from backend).
- `isSimulating`: Boolean.
- `timelineIndex`: Number (Current point in the scrubber).

**Store: `useUIStore`**
- `theme`: "paper" | "charcoal" (Future).
- `isSidebarOpen`: Boolean.
- `lastSimulationId`: String.

==================================================
3. SERVER STATE (React Query)
==================================================
- Used for fetching simulation history, user reports, and public editorial content.
- **Cache Policy**: 5-minute stale time for simulation results to prevent redundant API calls.

==================================================
4. FORM STATE (React Hook Form)
==================================================
- Used for the simulation input panels.
- Validated against Pydantic-equivalent Zod schemas.

==================================================
5. MOTION STATE (Framer Motion)
==================================================
- Orchestrated via `AnimatePresence` and layout transition flags.

==================================================
END OF DOCUMENT
==================================================
