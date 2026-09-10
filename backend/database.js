const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./accessibility.db");

db.run(`
    CREATE TABLE IF NOT EXISTS requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT,
        language TEXT,
        success INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

function saveRequest(action, language, success) {
    db.run(
        `INSERT INTO requests (action, language, success)
         VALUES (?, ?, ?)`,
        [action || "unknown", language || "English", success ? 1 : 0]
    );
}

module.exports = { saveRequest };
