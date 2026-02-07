import axios from 'axios';

// Base URL resolution:
// 1) Use VITE_API_BASE_URL when provided
// 2) If running in browser on localhost and not port 3000, assume backend at :3000
// 3) Otherwise use same-origin
// 4) Fallback for SSR/build tools: localhost:3000
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
