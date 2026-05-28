# CHRONICLE FINANCE
## ACCESSIBILITY_GUIDELINES.md

DOCUMENT TYPE:
Accessibility and Inclusivity Standards

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. PHILOSOPHY
==================================================
Premium design must not exclude users. Chronicle Finance follows WCAG 2.1 Level AA standards.

==================================================
2. TYPOGRAPHY AND READABILITY
==================================================
- **Contrast**: Minimum 4.5:1 for body text, 3:1 for large text.
- **Scaling**: UI must remain usable at 200% text zoom.
- **Line Length**: Limit body text to 75 characters per line for cognitive ease.

==================================================
3. KEYBOARD NAVIGATION
==================================================
- **Focus States**: High-visibility focus rings (Gold/Charcoal).
- **Skip Links**: "Skip to Simulation" button for screen readers.
- **Tab Order**: Logical flow through the simulation workspace.

==================================================
4. SCREEN READERS (ARIA)
==================================================
- **Dynamic Content**: Use `aria-live` for AI insight generation.
- **Charts**: Provide hidden data tables for D3.js/Three.js visualizations.
- **Semantic HTML**: Use `article`, `section`, `nav`, and proper heading levels (h1-h6).

==================================================
5. MOTION SENSITIVITY
==================================================
- Respect `prefers-reduced-motion`.
- Provide a toggle to "Pause Visual Atmosphere" (Background particles/Bubble pulse).

==================================================
END OF DOCUMENT
==================================================
