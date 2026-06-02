# CHRONICLE FINANCE
## INSIGHT_GENERATION.md

DOCUMENT TYPE:
AI Insight Generation Logic

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. INSIGHT CATEGORIES
==================================================
- **The "Big Picture"**: High-level summary of the outcome.
- **Risk Identification**: Pointing out volatility spikes or tail-end risks.
- **Assumption Commentary**: Challenging the user's inputs (e.g., "A 20% annual return may be overly optimistic").
- **Educational Detours**: Short explanations of the underlying math (e.g., why DCF is sensitive to interest rates).

==================================================
2. DATA MAPPING
==================================================
The AI is specifically instructed to look at:
- `volatility_score`: To trigger risk commentary.
- `final_value` vs `total_contributions`: To trigger compounding commentary.
- `confidence_intervals`: To discuss uncertainty.

==================================================
3. STREAMING REVEAL
==================================================
Insights are generated as a stream to the frontend.
- **Trigger**: Simulation completion.
- **Effect**: Text appears to be "written" by an analyst in real-time.

==================================================
4. CONTEXTUAL HIGHLIGHTS
==================================================
The AI can output special tags like `[[highlight:year_10]]`.
- **Frontend Action**: The D3.js graph pulses at the Year 10 mark when this text is reached in the stream.

==================================================
END OF DOCUMENT
==================================================
