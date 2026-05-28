# CHRONICLE FINANCE
## COMPONENT_RULES.md

DOCUMENT TYPE:
Shared Component Engineering Rules

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. PURPOSE OF THIS DOCUMENT
==================================================

This document defines the engineering and design rules for building components within the Chronicle Finance ecosystem.

Its purpose is to ensure:
- visual and functional consistency
- architectural purity
- scalability across features
- adherence to the editorial identity

==================================================
2. CORE COMPONENT PHILOSOPHY
==================================================

Every component in Chronicle Finance is a part of an editorial whole. 

Components must be:
- **Focused**: Single responsibility.
- **Atomic**: Built from shared design tokens.
- **Calm**: No unnecessary visual noise.
- **Accessible**: Semantic HTML and keyboard-friendly.

==================================================
3. ARCHITECTURAL CONSTRAINTS
==================================================

- **Framework**: Components must be built using Next.js and TypeScript.
- **Styling**: Exclusively use Tailwind CSS classes referencing our Design Tokens.
- **State**: Keep local state minimal. Use Zustand for global simulation states.
- **Logic Isolation**: Separate rendering logic from data fetching (use React Query for fetching).

==================================================
4. VISUAL HIERARCHY RULES
==================================================

- **Headlines**: Always use the Serif Display system for section titles.
- **Body**: Use the Sans Utility system for data and interactive labels.
- **Borders**: Use subtle, thin borders (0.5px - 1px) to mimic newspaper rules.
- **Shadows**: Avoid heavy dropshadows. Use "atmospheric depth" (subtle shifts in background color) instead.

==================================================
5. INTERACTION RULES
==================================================

- **Hover States**: Should be restrained. Subtle color shifts or micro-panning.
- **Loading**: Use editorial-style skeletons or "streaming" reveals.
- **Errors**: Present errors as "Editorial Corrections" or analytical alerts, not generic red popups.

==================================================
6. REUSABILITY AND MODULARITY
==================================================

- Components should be stored in `@/components/[category]`.
- Prop types must be explicitly defined and documented.
- Avoid hardcoding strings; use a shared localization/content file.

==================================================
7. SAFETY RULES
==================================================

- **DO NOT** introduce third-party UI libraries (Radix/Shadcn) without verifying they match the design system 100%.
- **DO NOT** use "gaming" UI patterns (neon glows, heavy glassmorphism).
- **DO NOT** break the 12-column grid system.

==================================================
END OF DOCUMENT
==================================================
