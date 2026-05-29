# CHRONICLE FINANCE
## TECH_STACK.md

DOCUMENT TYPE:
Technology Stack Documentation

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. PURPOSE OF THIS DOCUMENT
==================================================

This document defines the official technology stack of Chronicle Finance.

Its purpose is to:
- standardize engineering decisions
- prevent stack inconsistency
- preserve scalability
- optimize maintainability
- reduce technical fragmentation

ALL ENGINEERING TEAMS MUST:
Follow this stack unless approved architectural changes are documented.

==================================================
2. CORE STACK PHILOSOPHY
==================================================

Chronicle Finance requires a stack capable of supporting:

- cinematic interfaces
- real time interactions
- financial simulations
- AI interpretation systems
- scalable APIs
- high performance rendering
- SEO optimization

The technology stack must prioritize:
- scalability
- maintainability
- performance
- modularity
- developer productivity

==================================================
3. PRIMARY STACK OVERVIEW
==================================================

FRONTEND:
Next.js + TypeScript

BACKEND:
Python FastAPI

DATABASE:
Supabase PostgreSQL

ANIMATION:
Framer Motion + Three.js

VISUALIZATION:
D3.js + Three.js

AI:
OpenAI API

DEPLOYMENT:
Vercel + Railway/Render

==================================================
4. FRONTEND STACK
==================================================

PRIMARY FRAMEWORK:
Next.js

LANGUAGE:
TypeScript

STYLING:
Tailwind CSS

==================================================
5. WHY NEXT.JS
==================================================

Next.js is selected because it supports:

- server side rendering
- SEO optimization
- scalable routing
- performance optimization
- component architecture
- deployment simplicity

Next.js aligns with:
Chronicle Finance SEO and editorial architecture goals.

==================================================
6. WHY TYPESCRIPT
==================================================

TypeScript is mandatory.

PURPOSE:
- type safety
- maintainability
- large scale architecture
- safer refactoring
- improved collaboration

ALL FRONTEND CODE MUST:
Use TypeScript.

==================================================
7. WHY TAILWIND CSS
==================================================

Tailwind CSS is selected because it enables:

- rapid iteration
- consistent spacing systems
- scalable design tokens
- responsive design efficiency

IMPORTANT:
Tailwind must respect:
Chronicle Finance editorial identity.

DO NOT:
abuse utility classes to create inconsistent UI.

==================================================
8. FRONTEND LIBRARIES
==================================================

ALLOWED PRIMARY LIBRARIES:

- Framer Motion
- Three.js
- D3.js
- Zustand
- React Query
- clsx

ALL ADDITIONAL LIBRARIES REQUIRE:
architectural review.

==================================================
9. STATE MANAGEMENT
==================================================

PRIMARY STATE MANAGEMENT:
Zustand

PURPOSE:
- lightweight architecture
- simulation state control
- UI synchronization
- animation coordination

Avoid:
large unnecessary state systems.

==================================================
10. DATA FETCHING
==================================================

PRIMARY TOOL:
React Query

PURPOSE:
- caching
- async state handling
- API synchronization
- loading state management

==================================================
11. MOTION STACK
==================================================

PRIMARY MOTION LIBRARY:
Framer Motion

PURPOSE:
- page transitions
- interaction feedback
- animation orchestration
- cinematic movement

==================================================
12. 3D AND IMMERSIVE RENDERING
==================================================

PRIMARY RENDERING ENGINE:
Three.js

PURPOSE:
- bubble systems
- particle systems
- immersive simulation rendering
- dynamic environments

IMPORTANT:
Three.js should enhance:
immersion.

NOT:
turn the platform into a game interface.

==================================================
13. VISUALIZATION STACK
==================================================

PRIMARY VISUALIZATION TOOL:
D3.js

PURPOSE:
- financial graphs
- timelines
- statistical rendering
- probability visualization

Three.js may integrate with D3 systems where necessary.

==================================================
14. BACKEND STACK
==================================================

PRIMARY FRAMEWORK:
FastAPI

LANGUAGE:
Python

==================================================
15. WHY FASTAPI
==================================================

FastAPI is selected because it supports:

- high performance APIs
- asynchronous execution
- clean architecture
- financial computation integration
- scalable backend systems

FastAPI aligns with:
simulation heavy architecture.

==================================================
16. BACKEND LIBRARIES
==================================================

CORE LIBRARIES:

- NumPy
- Pandas
- SciPy
- Pydantic

OPTIONAL FUTURE LIBRARIES:

- QuantLib
- PyTorch
- Statsmodels

==================================================
17. FINANCIAL ENGINE RULE
==================================================

ALL FINANCIAL CALCULATIONS MUST:
occur in backend systems.

The frontend must NEVER:
compute authoritative financial logic.

This prevents:
- inconsistency
- security risks
- unreliable calculations

==================================================
18. DATABASE STACK
==================================================

PRIMARY DATABASE:
Supabase PostgreSQL

PURPOSE:
- simulation storage
- user persistence
- analytics
- AI output storage
- subscription systems

==================================================
19. WHY POSTGRESQL
==================================================

PostgreSQL is selected because it supports:

- relational structure
- scalability
- reliability
- analytics compatibility
- enterprise grade querying

==================================================
20. DATABASE ACCESS
==================================================

ALLOWED DATABASE TOOLS:

- Prisma
- SQLAlchemy

All database interactions must:
remain structured and validated.

==================================================
21. AI STACK
==================================================

PRIMARY AI PROVIDER:
OpenAI API

PURPOSE:
- insight interpretation
- educational explanations
- editorial commentary
- scenario analysis

==================================================
22. AI SYSTEM RULES
==================================================

The AI system must:
interpret simulation outputs.

The AI system must NOT:
generate authoritative calculations independently.

Simulation authority belongs to:
backend financial engines.

==================================================
23. DEPLOYMENT STACK
==================================================

FRONTEND HOSTING:
Vercel

BACKEND HOSTING:
Railway or Render

DATABASE HOSTING:
Supabase

==================================================
24. WHY VERCEL
==================================================

Vercel is selected because it provides:

- seamless Next.js integration
- fast deployment
- global CDN
- preview deployments
- optimized frontend performance

==================================================
25. VERSION CONTROL
==================================================

VERSION CONTROL SYSTEM:
Git

REPOSITORY PLATFORM:
GitHub

BRANCH STRATEGY:
- main
- development
- feature branches

Direct commits to main:
NOT ALLOWED.

==================================================
26. API ARCHITECTURE
==================================================

API STYLE:
REST

All APIs must:
- remain versioned
- remain documented
- use validation
- return structured responses

==================================================
27. AUTHENTICATION STACK
==================================================

PREFFERED AUTH SYSTEM:
Supabase Auth

PURPOSE:
- account systems
- subscriptions
- saved simulations
- personalization

==================================================
28. ANALYTICS STACK
==================================================

PREFERRED TOOLS:

- PostHog
- Plausible
- Google Analytics

PURPOSE:
- retention tracking
- funnel analysis
- simulation engagement
- product optimization

==================================================
29. SEO STACK
==================================================

SEO TOOLS:

- next-sitemap
- Next.js metadata system
- structured data markup

PURPOSE:
- search indexing
- public report discoverability
- educational content scaling

==================================================
30. PERFORMANCE REQUIREMENTS
==================================================

The stack must support:

- smooth rendering
- high FPS interactions
- optimized bundles
- lazy loading
- responsive performance

Heavy systems must:
remain isolated and optimized.

==================================================
31. SECURITY REQUIREMENTS
==================================================

Mandatory requirements:

- environment variable protection
- API validation
- rate limiting
- sanitized AI responses
- secure authentication

Sensitive keys must NEVER:
exist in frontend code.

==================================================
32. ENGINEERING CONSISTENCY RULE
==================================================

Developers must avoid:
- unnecessary frameworks
- duplicate tooling
- experimental rewrites
- stack fragmentation

Consistency is critical for:
scalability and maintainability.

==================================================
33. FUTURE STACK EXPANSION
==================================================

Possible future additions:

- Redis
- WebSockets
- Kubernetes
- GPU compute systems
- vector databases
- AI orchestration systems

Future additions must:
integrate cleanly into current architecture.

==================================================
34. FINAL STACK PRINCIPLE
==================================================

The Chronicle Finance stack exists to support:

clarity,
immersion,
performance,
and scalability.

Technology should strengthen:
the product experience.

NOT:
complicate it.

==================================================
END OF DOCUMENT
==================================================