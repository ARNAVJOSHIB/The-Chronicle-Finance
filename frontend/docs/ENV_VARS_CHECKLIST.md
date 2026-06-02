# Chronicle Finance - Environment Variables Checklist

When deploying the Chronicle Finance application to production environments (e.g., Vercel for Frontend, Railway/Render for Backend), ensure the following environment variables are securely configured.

## Frontend (Vercel)
These variables must be set in your Vercel project settings.

| Variable Name | Description | Example / Source | Required |
|---------------|-------------|------------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | The URL of your Supabase project. | `https://xxxxxx.supabase.co` | **Yes** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The public anon key for your Supabase project. | `eyJhb...` | **Yes** |
| `NEXT_PUBLIC_API_BASE_URL` | The base URL of the deployed FastAPI backend. | `https://api.chronicle-finance.com/api` | **Yes** |

## Backend (Railway / Render)
These variables must be set in your backend hosting provider's environment configuration.

| Variable Name | Description | Example / Source | Required |
|---------------|-------------|------------------|----------|
| `SUPABASE_URL` | The URL of your Supabase project. | `https://xxxxxx.supabase.co` | **Yes** |
| `SUPABASE_SERVICE_KEY` | The secret service role key for administrative DB access. | `eyJhb...` | **Yes** |
| `GROQ_API_KEY` | The API key for Groq to power AI Insights. | `gsk_...` | **Yes** |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed frontend domains for CORS. | `https://chronicle-finance.com` | **Yes** |

### Important Security Notes
* **Never** expose `SUPABASE_SERVICE_KEY` or `GROQ_API_KEY` to the frontend (`NEXT_PUBLIC_` prefix).
* Ensure `ALLOWED_ORIGINS` in the backend matches the exact URL of your Vercel deployment (e.g., `https://chronicle-finance.vercel.app` or custom domain) to prevent CORS errors.
* The frontend `.env.local` or `.env.production.local` should only contain `NEXT_PUBLIC_` variables.
