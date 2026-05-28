# CHRONICLE FINANCE
## PROMPT_ARCHITECTURE.md

DOCUMENT TYPE:
AI Prompt Engineering and Orchestration

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. PROMPT STRUCTURE
==================================================
All prompts follow a 4-part structure:
1. **Persona**: Definition of the Senior Financial Analyst.
2. **Context**: Structured simulation data (JSON).
3. **Constraints**: Formatting rules and forbidden topics.
4. **Objective**: The specific insight needed (Summary, Risk, or Education).

==================================================
2. DYNAMIC SYSTEM PROMPT (Core)
==================================================
```text
You are the Chronicle Finance Editorial Intelligence. 
Your goal is to interpret financial simulations with elegance and analytical depth. 
Always use the editorial voice of a premium financial newspaper.
Formatting: Use Markdown for headers, bolding, and lists.
```

==================================================
3. VERSIONING AND TESTING
==================================================
- Prompts are stored in `/api/core/prompts` as versioned YAML files.
- All changes must be tested against a "Gold Set" of 10 simulation scenarios to ensure no tone-drift or hallucination.

==================================================
4. PERFORMANCE
==================================================
- Use GPT-4o for complex reports.
- Use GPT-3.5-turbo (or equivalent) for simple UI micro-copy and labels.

==================================================
END OF DOCUMENT
==================================================
