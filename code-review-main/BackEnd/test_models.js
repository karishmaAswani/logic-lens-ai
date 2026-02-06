require('dotenv').config();

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

const fs = require('fs');

async function listModels() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}\nDetails: ${JSON.stringify(data, null, 2)}`);
        }

        fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
        console.log("Models saved to models.json");

    } catch (error) {
        console.error("Failed to list models:", error.message);
    }
}

listModels();
