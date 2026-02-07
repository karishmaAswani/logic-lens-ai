const express = require('express');
const reviewRoutes = require('./routes/review.routes');
const cors = require('cors');
const compression = require('compression');

const app = express();

// Compression for better throughput
app.use(compression());

// CORS allow-list via ALLOWED_ORIGINS (comma-separated). If not set, allow all.
const allowedOrigins = process.env.ALLOWED_ORIGINS
	? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
	: null;
app.use(cors({
	origin: (origin, callback) => {
		if (!origin) return callback(null, true); // same-origin or curl
		if (!allowedOrigins || allowedOrigins.length === 0) return callback(null, true);
		if (allowedOrigins.includes(origin)) return callback(null, true);
		return callback(new Error('Not allowed by CORS'));
	}
}));

// Limit payload size to protect upstream quota/costs
app.use(express.json({ limit: '64kb' }));

// Very lightweight per-IP rate limiter (token bucket-ish)
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // per IP per window
const ipRequestLog = new Map();

app.use((req, res, next) => {
	const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
	const now = Date.now();
	const windowStart = now - WINDOW_MS;

	let requests = ipRequestLog.get(ip);
	if (!requests) {
		requests = [];
		ipRequestLog.set(ip, requests);
	}

	// Remove entries outside the window
	while (requests.length && requests[0] < windowStart) {
		requests.shift();
	}

	if (requests.length >= MAX_REQUESTS) {
		return res.status(429).json({
			error: 'Too many requests. Please slow down and try again shortly.'
		});
	}

	requests.push(now);
	next();
});

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/api/review', reviewRoutes);

module.exports = app