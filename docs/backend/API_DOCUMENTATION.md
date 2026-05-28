# CHRONICLE FINANCE
## API_DOCUMENTATION.md

DOCUMENT TYPE:
API Endpoint Reference

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. AUTHENTICATION
==================================================
Currently using Bearer Token (JWT) in the `Authorization` header for protected routes.

==================================================
2. SIMULATION ENDPOINTS
==================================================
**POST `/v1/simulate/compound-interest`**
- Parameters: `principal`, `rate`, `frequency`, `years`, `contribution`.
- Returns: Timeline of projected values and interest.

**POST `/v1/simulate/dcf`**
- Parameters: `cash_flows`, `discount_rate`, `terminal_growth`.
- Returns: Present value, intrinsic value, and sensitivity analysis.

**POST `/v1/simulate/monte-carlo`**
- Parameters: `iterations`, `mean_return`, `volatility`, `time_horizon`.
- Returns: Probability distribution and confidence intervals.

==================================================
3. AI INTERPRETATION ENDPOINTS
==================================================
**POST `/v1/interpret`**
- Payload: `simulation_result_id` or raw simulation data.
- Returns: Streamed Markdown text containing editorial insights.

==================================================
4. SCHEMA EXAMPLES
==================================================
(Refer to `@/api/models` for full Pydantic definitions)

==================================================
END OF DOCUMENT
==================================================
