const express = require('express');
const reviewController = require("../controllers/review.controller");

const router = express.Router();

router.post("/", reviewController.reviewCode);

// Friendly message for accidental GET requests (e.g., opening in browser)
router.get("/", (req, res) => {
	res.status(405).json({
		error: "Method Not Allowed. Use POST /api/review with JSON body: { code: \"...\" }"
	});
});

module.exports = router;
