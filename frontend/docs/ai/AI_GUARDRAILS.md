# CHRONICLE FINANCE
## AI_GUARDRAILS.md

DOCUMENT TYPE:
AI Safety and Compliance Guardrails

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. FINANCIAL ADVICE PROHIBITION
==================================================
- **Mandatory Disclaimer**: Every AI response must conclude with a subtle, editorial disclaimer stating that this is an educational simulation, not financial advice.
- **Forbidden Phrases**: "You should buy...", "I recommend...", "Guaranteed return."

==================================================
2. HALLUCINATION PREVENTION
==================================================
- The AI must only reference the numbers provided in the `simulation_result` JSON.
- If data is missing, the AI must state: "Data insufficient for analysis" rather than inventing a trend.

==================================================
3. CONTENT FILTERING
==================================================
- Use OpenAI's moderation API to block toxic, speculative, or illegal content generation.
- Block all political or non-financial queries.

==================================================
4. CALCULATION LOCK
==================================================
- **Crucial**: The AI is forbidden from performing arithmetic. If it needs a percentage change, it must use the pre-calculated value from the backend.

==================================================
END OF DOCUMENT
==================================================
