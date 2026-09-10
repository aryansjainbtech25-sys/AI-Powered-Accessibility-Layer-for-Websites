const express = require("express");
const cors = require("cors");
const { saveRequest } = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

const allowedActions = [
    "simplify",
    "translate",
    "find_action",
    "voice"
];

app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
});

app.post("/process", (req, res) => {
    const { action, page_text, language = "English" } = req.body;

    if (!page_text || !page_text.trim()) {
        saveRequest(action, language, false);

        return res.status(400).json({
            success: false,
            error: "No webpage content provided"
        });
    }

    if (!allowedActions.includes(action)) {
        saveRequest(action, language, false);

        return res.status(400).json({
            success: false,
            error: "Invalid action"
        });
    }

    const result = "Request received successfully";

    saveRequest(action, language, true);

    res.json({
        success: true,
        action,
        language,
        result
    });
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log("Backend running on http://localhost:3000");
    });
}

module.exports = app;
