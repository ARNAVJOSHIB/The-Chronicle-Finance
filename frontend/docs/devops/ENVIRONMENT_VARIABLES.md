# CHRONICLE FINANCE
## ENVIRONMENT_VARIABLES.md

DOCUMENT TYPE:
Required Secret and Configuration Keys

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. FRONTEND (Next.js)
==================================================
- `NEXT_PUBLIC_API_URL`: Backend endpoint.
- `NEXT_PUBLIC_POSTHOG_KEY`: Analytics.
- `NEXTAUTH_SECRET`: Session security.

==================================================
2. BACKEND (FastAPI)
==================================================
- `DATABASE_URL`: PostgreSQL connection string.
- `OPENAI_API_KEY`: For interpretation.
- `STRIPE_SECRET_KEY`: For payments.
- `JWT_SECRET`: For internal auth.

==================================================
3. DEPLOYMENT KEYS
==================================================
- `VERCEL_TOKEN`: For CI/CD.
- `RAILWAY_API_KEY`: For backend CI/CD.

==================================================
4. SECURITY RULE
==================================================
- NEVER commit `.env` files to Git.
- Secrets are managed exclusively via Vercel/Railway dashboards.

==================================================
END OF DOCUMENT
==================================================
