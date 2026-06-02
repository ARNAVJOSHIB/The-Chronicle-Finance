# CHRONICLE FINANCE
## RESPONSIVE_DESIGN.md

DOCUMENT TYPE:
Mobile and Multi-Device Design Strategy

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. BREAKPOINTS (Tailwind Standard)
==================================================
- **`sm`**: 640px (Mobile Landscape)
- **`md`**: 768px (Tablet)
- **`lg`**: 1024px (Small Desktop)
- **`xl`**: 1280px (Premium Desktop)
- **`2xl`**: 1536px (Ultra-wide / Institutional)

==================================================
2. MOBILE PHILOSOPHY
==================================================
- **Stack, Don't Squish**: Maintain editorial line lengths by stacking columns.
- **Touch Targets**: Min 44x44px for all inputs.
- **Simplified Motion**: Reduce particle density and Three.js shader complexity on mobile devices.

==================================================
3. TABLET OPTIMIZATION
==================================================
- Use a 2-column "Spread" layout for the simulation workspace.
- The Bubble System remains the central focus, with inputs moving to a bottom drawer or side panel.

==================================================
4. DESKTOP OPTIMIZATION
==================================================
- Full 3-column "Front Page" layout.
- Ambient grid and high-detail Three.js effects enabled.

==================================================
5. VIEWPORT CONSTRAINTS
==================================================
- Max-width: 1920px (Content remains centered to prevent line-length issues).
- Side-padding: 5% (Fluid gutter).

==================================================
END OF DOCUMENT
==================================================
