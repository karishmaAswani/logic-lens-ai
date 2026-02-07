const aiService = require("../services/gemini.service");
const { z } = require('zod');

module.exports.reviewCode = async (req, res) => {
    const code = req.body.code;

    // Validate request
    const schema = z.object({
        code: z.string().min(1, "Code is required").max(8000, "Code is too long (max 8000 chars)")
    });
    const parsed = schema.safeParse({ code });
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues[0]?.message || "Invalid input" });
    }

    try {
        const result = await aiService(code);
        res.json(result);
    } catch (error) {
        console.error("Review Controller Error:", error);

        const statusCode = error.status || error.statusCode || 500;
        let errorMessage = "Something went wrong processing the review.";

        if (statusCode === 429) {
            errorMessage = "Too many requests. You have exceeded your API quota. Please try again shortly.";
            res.setHeader('Retry-After', '5');
        } else if (statusCode === 503) {
            errorMessage = "Temporary upstream network issue. Please try again.";
        } else if (error.message) {
            errorMessage = error.message;
        }

        res.status(statusCode).json({ error: errorMessage });
    }
}

