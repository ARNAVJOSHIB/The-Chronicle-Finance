# CHRONICLE FINANCE
## ERROR_HANDLING.md

DOCUMENT TYPE:
Backend Error Handling and Status Codes

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. STATUS CODES
==================================================
- **200 OK**: Success.
- **400 Bad Request**: Malformed JSON.
- **422 Unprocessable Entity**: Validation error (e.g., negative interest rate).
- **401 Unauthorized**: Missing/Invalid JWT.
- **429 Too Many Requests**: Rate limit exceeded.
- **500 Internal Server Error**: Unexpected crash.

==================================================
2. VALIDATION EXCEPTIONS
==================================================
All 422 errors return a structured body:
```json
{
  "error_type": "validation_error",
  "details": [
    { "field": "rate", "message": "Interest rate cannot exceed 100% for this model." }
  ]
}
```

==================================================
3. SIMULATION FAILURES
==================================================
If a Monte Carlo simulation fails to converge or hits a math error:
- **Status**: 200 (Success) but with a `warning` flag in the payload.
- **Action**: Frontend shows a "Model Alert" instead of a crash.

==================================================
4. LOGGING POLICY
==================================================
- **Level: INFO**: Simulation requests and completions.
- **Level: WARNING**: Validation failures.
- **Level: ERROR**: 500 status codes with stack traces.
- **Sentry**: All ERROR levels are piped to Sentry for real-time tracking.

==================================================
END OF DOCUMENT
==================================================
