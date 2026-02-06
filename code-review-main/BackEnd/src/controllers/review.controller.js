const aiService = require("../services/gemini.service");

module.exports.reviewCode = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Code is required");
    }

    try {
        const result = await aiService(code);
        res.json(result);
    } catch (error) {
        console.error("Review Controller Error:", error);

        const statusCode = error.status || 500;
        let errorMessage = "Something went wrong processing the review.";

        if (statusCode === 429) {
            errorMessage = "Too many requests. You have exceeded your API quota. Please try again in a few seconds.";
        } else if (error.message) {
            errorMessage = error.message;
        }

        res.status(statusCode).json({ error: errorMessage });
    }
}

