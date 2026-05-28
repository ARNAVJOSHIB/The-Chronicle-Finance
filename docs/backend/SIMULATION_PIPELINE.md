# CHRONICLE FINANCE
## SIMULATION_PIPELINE.md

DOCUMENT TYPE:
Data Processing Pipeline Documentation

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. PIPELINE OVERVIEW
==================================================
The pipeline ensures that a user request is transformed from raw parameters into an immersive editorial report.

==================================================
2. STAGE 1: INGESTION & VALIDATION
==================================================
- **Action**: Frontend POSTs to FastAPI.
- **Process**: Pydantic validates data types and ranges.
- **Failure**: 422 Unprocessable Entity with field-specific errors.

==================================================
3. STAGE 2: MATHEMATICAL EXECUTION
==================================================
- **Action**: Call specific Engine (e.g., `engines/monte_carlo.py`).
- **Process**: Vectorized calculations using NumPy/Pandas.
- **Output**: Raw arrays of time-series data.

==================================================
4. STAGE 3: STATISTICAL POST-PROCESSING
==================================================
- **Action**: Analysis of raw data.
- **Process**: Calculate Mean, Median, Confidence Intervals (95th/5th percentile).
- **Output**: Summary metrics.

==================================================
5. STAGE 4: AI CONTEXTUALIZATION
==================================================
- **Action**: Simulation result + Prompt sent to OpenAI.
- **Process**: AI generates editorial interpretation.
- **Output**: Streamed Markdown.

==================================================
6. STAGE 5: VISUALIZATION HYDRATION
==================================================
- **Action**: Return JSON to Frontend.
- **Process**: Three.js and D3.js render the "Bubble" and "Graphs".

==================================================
END OF DOCUMENT
==================================================
