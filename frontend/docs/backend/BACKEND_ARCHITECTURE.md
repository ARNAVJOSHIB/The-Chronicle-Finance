# CHRONICLE FINANCE
## BACKEND_ARCHITECTURE.md

DOCUMENT TYPE:
Backend System Architecture

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. TECHNOLOGY STACK
==================================================
- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Validation**: Pydantic v2
- **Concurrency**: Asyncio
- **Math/Stats**: NumPy, Pandas, SciPy

==================================================
2. SERVICE STRUCTURE
==================================================
```
/api
  /routes          # FastAPI endpoint definitions
  /models          # Pydantic schemas (Request/Response)
  /services        # Business logic / Simulation orchestrators
  /engines         # Pure mathematical calculation logic
    - compound.py
    - dcf.py
    - monte_carlo.py
  /core            # Configuration, Security, and Logging
```

==================================================
3. DESIGN PATTERNS
==================================================
- **Pure Engines**: The `/engines` directory should contain pure functions that take floats/ints and return arrays/dataframes. No API logic allowed here.
- **Dependency Injection**: Use FastAPI's `Depends` for shared services (DB, AI Clients).
- **Graceful Failure**: Structured exceptions that map to clear frontend error codes.

==================================================
4. PERFORMANCE RULES
==================================================
- Target API response time: < 200ms (excluding AI interpretation).
- Use `numba` or `cython` for heavy Monte Carlo iterations if performance bottlenecks occur.

==================================================
END OF DOCUMENT
==================================================
