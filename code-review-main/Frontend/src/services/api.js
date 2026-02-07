import axios from 'axios';

// Base URL resolution:
// 1) Use VITE_API_BASE_URL when provided
// 2) If running in browser on localhost and not port 3000, assume backend at :3000
// 3) If hosted on Vercel and no env provided, use the deployed backend URL
// 4) Otherwise use same-origin
// 5) Fallback for SSR/build tools: localhost:3000
const PRODUCTION_BACKEND_URL = 'https://logic-lens-ai-server.vercel.app';
function resolveBaseUrl() {
	const envUrl = import.meta.env?.VITE_API_BASE_URL;
	if (envUrl) return envUrl;

	if (typeof window !== 'undefined') {
		const origin = window.location.origin;
		const isLocal =
			origin.includes('localhost') ||
			origin.includes('127.0.0.1') ||
			origin.includes('0.0.0.0');

		if (isLocal && !origin.endsWith(':3000')) {
			return 'http://localhost:3000';
		}

		// If deployed on Vercel and no explicit env, default to known backend URL
		const isVercel = window.location.hostname.endsWith('.vercel.app');
		if (isVercel) {
			return PRODUCTION_BACKEND_URL;
		}

		return origin;
	}

	return 'http://localhost:3000';
}

const api = axios.create({
	baseURL: resolveBaseUrl(),
	headers: { 'Content-Type': 'application/json' },
	timeout: 30000,
});

export const reviewCode = async (code) => {
	return await api.post('/api/review', { code });
};

export default api;
