# CHRONICLE FINANCE
## API_CONTRACTS.md

DOCUMENT TYPE:
Inter-Layer API Specifications

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. PURPOSE OF THIS DOCUMENT
==================================================

This document defines the data contracts between Layer 1 (Frontend), Layer 3 (Simulation Engine), and Layer 4 (AI Interpretation).

==================================================
2. REQUEST CONTRACT (Frontend -> Backend)
==================================================

All simulation requests must be POSTed to `/api/v1/simulate/[model_type]`.

**Common Payload**:
```json
{
  "model_type": "compound_interest | dcf | monte_carlo",
  "parameters": {
    "principal": number,
    "rate": number,
    "time_horizon": number,
    "frequency": string
  },
  "metadata": {
    "user_id": string,
    "session_id": string
  }
}
```

==================================================
3. RESPONSE CONTRACT (Backend -> Frontend)
==================================================

The backend returns a structured JSON designed for both visualization and AI interpretation.

**Response Structure**:
```json
{
  "status": "success | error",
  "data": {
    "summary": {
      "final_value": number,
      "total_growth": number,
      "volatility_score": number
    },
    "timeline": [
      { "period": number, "value": number, "confidence_low": number, "confidence_high": number }
    ],
    "ai_context": {
      "risk_factors": string[],
      "assumptions_made": string[],
      "anomalies_detected": boolean
    }
  },
  "timestamp": "ISO-8601"
}
```

==================================================
4. AI INTERPRETATION CONTRACT (Frontend -> AI)
==================================================

The AI receives the full `data` object from the simulation response along with a specific editorial prompt.

**Prompt Template**:
"As a senior financial analyst for Chronicle Finance, interpret the following simulation data for a [user_persona]. Focus on risk and long-term implications."

==================================================
5. ERROR CONTRACT
==================================================

Errors must follow this format:
```json
{
  "error_code": string,
  "message": string,
  "field_validation": [ { "field": string, "issue": string } ]
}
```

==================================================
6. VERSIONING POLICY
==================================================

- All API endpoints must be prefixed with `/v1/`.
- Breaking changes require a `/v2/` increment and 3-month deprecation period.

==================================================
END OF DOCUMENT
==================================================
