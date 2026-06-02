# CHRONICLE FINANCE
## CONTEXT_MANAGEMENT.md

DOCUMENT TYPE:
AI Context Window and Data Management

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. THE CONTEXT PAYLOAD
==================================================
To minimize token costs and maximize accuracy, the AI is sent a "Compressed Simulation Snapshot" rather than the full raw time-series.

**Payload Content**:
- Model Metadata (Type, Date, Horizon).
- Summary Metrics (Start, End, Max Drawdown).
- Critical Anomaly Points (e.g., Year 5 volatility spike).
- User Persona (to adjust tone).

==================================================
2. SESSION MEMORY
==================================================
- The AI has access to the **last 3 simulations** in the current session.
- **Purpose**: To allow for comparison commentary (e.g., "Compared to your last DCF model, this scenario is significantly more conservative").

==================================================
3. TOKEN OPTIMIZATION
==================================================
- Max context window: 4,000 tokens.
- Max response: 1,000 tokens (Editorial reports are concise).

==================================================
4. DATA PRIVACY
==================================================
- No PII (Personally Identifiable Information) is ever sent to the AI API.
- Usernames are replaced with generic IDs.

==================================================
END OF DOCUMENT
==================================================
