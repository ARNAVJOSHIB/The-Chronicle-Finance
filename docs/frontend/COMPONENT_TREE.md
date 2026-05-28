# CHRONICLE FINANCE
## COMPONENT_TREE.md

DOCUMENT TYPE:
Component Hierarchy Documentation

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. LAYOUT SHELL
==================================================
- **`EditorialLayout`** (Root)
  - `Navbar`: Premium top navigation.
  - `MainContent`: Dynamic page area.
  - `Footer`: Archival information and links.

==================================================
2. HERO SECTION
==================================================
- **`Hero`**
  - `Headline`: Playfair Display title.
  - `IntroSummary`: High-level vision text.
  - `AmbientBackground`: Subtle particle/grid effect.

==================================================
3. SIMULATION WORKSPACE
==================================================
- **`Workspace`**
  - `Sidebar`: Model selection.
  - `InputPanel`: Dynamic form fields.
  - `Viewport`: The Bubble System + Graphs.
    - `BubbleContainer`: Three.js wrapper.
    - `GraphLayer`: D3.js SVG overlay.
  - `TimelineScrubber`: Date/Time control.

==================================================
4. INSIGHT LAYER
==================================================
- **`InsightPanel`**
  - `AICommentary`: Streaming text area.
  - `MetricGrid`: Key simulation numbers.
  - `RiskAlerts`: Critical warnings.

==================================================
5. EDITORIAL COMPONENTS
==================================================
- **`Report`**
  - `ReportHeader`: Date, Author (AI), Model Type.
  - `ReportBody`: Multi-column editorial text.
  - `Callout`: Highlighted data points.

==================================================
END OF DOCUMENT
==================================================
