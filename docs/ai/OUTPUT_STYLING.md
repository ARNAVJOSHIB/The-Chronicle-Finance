# CHRONICLE FINANCE
## OUTPUT_STYLING.md

DOCUMENT TYPE:
AI Response Formatting and Styling

STATUS:
FOUNDATIONAL

VERSION:
1.0

LAST UPDATED:
May 2026

==================================================
1. MARKDOWN STANDARDS
==================================================
AI must use standard Markdown for all editorial outputs:
- **`###`** for Section Headers.
- **`**text**`** for highlighting key metrics.
- **`> `** for pull-quotes or analytical summaries.
- **`- `** for bulleted lists of risks or assumptions.

==================================================
2. EDITORIAL PATTERNS
==================================================
Every report should follow this structural pattern:
1. **Headline**: High-impact summary.
2. **Analysis**: The bulk of the interpretation.
3. **The Risk Note**: Shaded block for volatility commentary.
4. **Closing Statement**: Educational takeaway.

==================================================
3. COMPONENT MAPPING
==================================================
Frontend renders AI Markdown using a custom `EditorialMarkdown` component that:
- Maps `h3` to the Serif Display font.
- Maps `blockquote` to a special ivory-boxed pull-quote.
- Injects the `[[highlight]]` tags into the visualization animation queue.

==================================================
END OF DOCUMENT
==================================================
