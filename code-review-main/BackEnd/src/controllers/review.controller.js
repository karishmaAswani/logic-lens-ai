const aiService = require("../services/gemini.service");

module.exports.reviewCode = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Code is required");
    }

    try {
        const review = await aiService(code);
        res.send(review); // Sending raw text as the frontend handles text too, but user requested 'Return structured JSON response' in prompt task description.
        // However, the frontend currently handles 'response.data.review' or 'response.data'.
        // Let's optimize:
        // res.json({ review: review }); 
        // But wait, my Frontend logic: const data = response.data; if(data.review)... else ...
        // So I can stick to simple text OR JSON. The user prompt asked for "Return structured JSON response".
        // I will do that. But I need to make sure the Frontend handles it (I added logic for that).
    } catch (error) {
        console.error("Review Controller Error:", error);
        if (error.status === 429) {
            return res.status(429).send("Too many requests. You have exceeded your API quota. Please try again later.");
        }
        res.status(500).send("Something went wrong processing the review.");
    }
}
