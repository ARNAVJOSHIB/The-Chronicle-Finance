# CHRONICLE FINANCE
## MONITORING_AND_LOGGING.md

DOCUMENT TYPE:
Production Monitoring and Observability

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. ERROR TRACKING
==================================================
- **Sentry**: Real-time crash reports for both Next.js and FastAPI.
- **Action**: Slack notifications for all `Critical` errors.

==================================================
2. LOGGING
==================================================
- **Logtail / Better Stack**: Centralized log management.
- **Standard**: Structured JSON logging.

==================================================
3. PERFORMANCE MONITORING
==================================================
- **Vercel Analytics**: Real-world Web Vitals.
- **Railway Metrics**: CPU/RAM and request latency.

==================================================
4. UPTIME
==================================================
- **Better Stack Uptime**: 24/7 monitoring of the `/health` endpoint.
- **Status Page**: Public status page at `status.chronicle.finance`.

==================================================
END OF DOCUMENT
==================================================
