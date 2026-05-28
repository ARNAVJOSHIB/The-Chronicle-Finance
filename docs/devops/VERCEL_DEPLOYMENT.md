# CHRONICLE FINANCE
## VERCEL_DEPLOYMENT.md

DOCUMENT TYPE:
Frontend Hosting and Vercel Configuration

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. HOSTING ARCHITECTURE
==================================================
- **Provider**: Vercel.
- **Framework**: Next.js (App Router).
- **Regions**: Global Edge Network (Edge Runtime for simulation interpret APIs).

==================================================
2. DEPLOYMENT WORKFLOW
==================================================
- **Previews**: Automatic for every Pull Request.
- **Production**: Main branch merges trigger immediate deployment.
- **Environment**: Managed via Vercel Dashboard.

==================================================
3. VERCEL CONFIG (`vercel.json`)
==================================================
- **Caching**: Headers configured for 1-year immutability on static assets.
- **Functions**: Memory allocated to max for AI processing.

==================================================
4. OPTIMIZATION
==================================================
- Automatic Image Optimization enabled.
- Automatic font subsetting for editorial serif fonts.

==================================================
END OF DOCUMENT
==================================================
