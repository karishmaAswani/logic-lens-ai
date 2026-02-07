## Backend (Express + Vercel) - Setup and Deployment

### Required environment variables

- `GOOGLE_GEMINI_API_KEY`: Google Generative AI API key used by the reviewer.
- `ALLOWED_ORIGINS` (optional): Comma‑separated list of allowed origins for CORS (e.g., `https://your-frontend.vercel.app,https://admin.yourdomain.com`). If unset, all origins are allowed.

Set this in Vercel Project Settings → Settings → Environment Variables for the Backend project.

### Runtime protections

- Per‑IP rate limiter: 10 requests/minute to protect upstream quota (HTTP 429 with `Retry-After: 5`).
- In‑memory cache: identical code inputs are cached for 5 minutes to avoid duplicate upstream calls.
- In‑flight de‑duplication: concurrent identical requests share a single upstream call.
- JSON body limit: 64kb to prevent oversized/expensive requests.

These are best‑effort in serverless environments (cache persists while function stays warm).

### Local development

1. Create `.env` with:
   ```bash
   GOOGLE_GEMINI_API_KEY=your_key_here
   ```
2. Run the server locally:
   ```bash
   node server.js
   ```
3. Backend will listen on `http://localhost:3000` (in non‑production).

### Notes

- 429 errors indicate quota/rate limits from the AI provider; the backend will retry with exponential backoff before surfacing 429 to the client.


