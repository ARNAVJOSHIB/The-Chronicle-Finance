# CHRONICLE FINANCE
## TIMELINE_ENGINE.md

DOCUMENT TYPE:
Interactive Timeline and Scrubber System

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. SYSTEM OBJECTIVE
==================================================
Allow users to travel through the "Time Horizon" of their simulation to observe the evolution of wealth and risk.

==================================================
2. THE SCRUBBER
==================================================
- **UI**: A thin, horizontal architectural slider.
- **Interaction**: Dragging updates the global `timelineIndex`.
- **Feedback**: The entire platform (Bubble, Graphs, Insights) updates in real-time to match the selected year/month.

==================================================
3. REVEAL STATES
==================================================
- **Past**: High contrast, solid lines.
- **Future (Projections)**: Lower contrast, dashed lines or shaded probability bands.

==================================================
4. KEYFRAME INTEGRATION
==================================================
- Critical simulation events (e.g., "Principal Withdrawn") are marked as keyframes on the timeline.
- AI commentary is mapped to these keyframes.

==================================================
END OF DOCUMENT
==================================================
