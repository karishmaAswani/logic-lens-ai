# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Deployment

Set the following environment variable in your Frontend project (Vercel → Settings → Environment Variables):

- `VITE_API_BASE_URL` — the full URL of your Backend deployment (e.g., `https://your-backend.vercel.app`)

If not set, the app will default to the same origin at runtime. For local development it will fall back to `http://localhost:3000`.
