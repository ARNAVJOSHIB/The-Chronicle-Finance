# CHRONICLE FINANCE
## CI_CD_PIPELINE.md

DOCUMENT TYPE:
CI/CD Workflow and Automation

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. WORKFLOW PLATFORM
==================================================
- GitHub Actions.

==================================================
2. PIPELINE STAGES
==================================================
- **Stage 1: Lint & Test**: Run ESLint and Pytest on all PRs.
- **Stage 2: Build**: Verify Next.js build and Docker image creation.
- **Stage 3: Preview**: Deploy ephemeral frontend to Vercel.
- **Stage 4: Production**: Automated deploy to Vercel/Railway upon merge to `main`.

==================================================
3. QUALITY GATES
==================================================
- Build must pass 100% before merge.
- Coverage report minimum: 80%.

==================================================
4. ROLLBACK POLICY
==================================================
- One-click rollback enabled via Vercel Dashboard for frontend.
- Git revert triggers automated redeploy of previous stable image for backend.

==================================================
END OF DOCUMENT
==================================================
