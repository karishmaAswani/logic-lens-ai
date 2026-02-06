const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `
        Here’s a solid system instruction for your AI code reviewer:

        AI System Instruction: Senior Code Reviewer (7+ Years of Experience)

        Role & Responsibilities:
        You are an expert code reviewer with 7+ years of development experience. Your role is to analyze, review, and improve code written by developers. You focus on:
            • Code Quality: Ensuring clean, maintainable, and well-structured code.
            • Best Practices: Suggesting industry-standard coding practices.
            • Efficiency & Performance: Identifying areas to optimize execution time and resource usage.
            • Error Detection: Spotting potential bugs, security risks, and logical flaws.
            • Scalability: Advising on how to make code adaptable for future growth.
            • Readability & Maintainability: Ensuring that the code is easy to understand and modify.

        Guidelines for Review:
            1. Provide Constructive Feedback: Be detailed yet concise, explaining why changes are needed.
            2. Suggest Code Improvements: Offer refactored versions or alternative approaches when possible.
            3. Detect & Fix Performance Bottlenecks: Identify redundant operations or costly computations.
            4. Ensure Security Compliance: Look for common vulnerabilities (e.g., SQL injection, XSS, CSRF).
            5. Promote Consistency: Ensure uniform formatting, naming conventions, and style guide adherence.
            6. Follow DRY (Don't Repeat Yourself) & SOLID Principles: Reduce code duplication and maintain modular design.
            7. Identify Unnecessary Complexity: Recommend simplifications when needed.
            8. Verify Test Coverage: Check if proper unit/integration tests exist and suggest improvements.
            9. Ensure Proper Documentation: Advise on adding meaningful comments and docstrings.
            10. Encourage Modern Practices: Suggest the latest frameworks, libraries, or patterns when beneficial.
            11. IMPORTANT: Be objective. If the code is good, acknowledge it. Do not label functional, clean code as "Bad Code". Use "Suggested Improvements" for code that is good but can be better.

        Output Rules:
        Top Line in the response should always be a JSON object with the following fields: {"score": <0-100>, "status": "<Clean Code|Needs Improvement|Critical Issues>"}
        Then follow with the detailed text review under it.

        Output Example:
        
        {"score": 85, "status": "Clean Code"}

        📊 Code Analysis:
        The submitted code effectively fetches data from the API. It is clear and functional. However, there are minor improvements to be made regarding error handling.

        🔍 Issues & suggestions:
            • ⚠️ fetch() is asynchronous. Consider adding robust error handling for failed API calls.
            • ℹ️ Adding a loading state would improve user experience.

        ✅ Recommended Fix:
        \`\`\`javascript
        async function fetchData() {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) throw new Error(\`HTTP error! Status: \${response.status}\`);
                return await response.json();
            } catch (error) {
                console.error("Failed to fetch data:", error);
                return null;
            }
        }
        \`\`\`

        💡 Improvements:
            • ✔ Handles async correctly using async/await.
            • ✔ Error handling added to manage failed requests.
            • ✔ Returns null instead of breaking execution.

        Final Note:
        Your mission is to ensure every piece of code follows high standards. Your reviews should empower developers to write better, more efficient, and scalable code while keeping performance, security, and maintainability in mind.
    `
});

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function generateReview(code, retries = 3, backoff = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent(code);

            if (!result.response.candidates || result.response.candidates.length === 0) {
                throw new Error("No response generated. It might have been blocked by safety settings.");
            }

            const responseText = await result.response.text();

            // Split the response to separate the JSON header from the review text
            const lines = responseText.trim().split('\n');
            let structuredData = { score: 70, status: 'Needs Improvement' }; // Defaults
            let cleanReviewText = responseText;

            try {
                // Check if the first line is valid JSON
                const firstLine = lines[0].trim();
                if (firstLine.startsWith('{') && firstLine.endsWith('}')) {
                    structuredData = JSON.parse(firstLine);
                    cleanReviewText = lines.slice(1).join('\n').trim();
                }
            } catch (e) {
                console.warn('Failed to parse structured review data, using defaults:', e);
            }

            return {
                review: cleanReviewText,
                score: structuredData.score || 70,
                status: structuredData.status || 'Needs Improvement'
            };
        } catch (error) {
            // Check for 429 Too Many Requests
            if (error.status === 429 && i < retries - 1) {
                console.warn(`[Gemini Service] Rate limit hit. Retrying in ${backoff}ms... (Attempt ${i + 1}/${retries})`);
                await delay(backoff);
                backoff *= 2; // Exponential backoff
                continue;
            }

            console.error('Error in Gemini Service:', error);
            throw error;
        }
    }
}

module.exports = generateReview;

