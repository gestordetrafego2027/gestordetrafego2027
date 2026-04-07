import sqlite3 from 'sqlite3';
const { Database } = sqlite3;

const db = new Database('./database.db');

const schema = `
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    content TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_id INTEGER,
    type TEXT,
    url TEXT,
    alt_text TEXT,
    FOREIGN KEY(page_id) REFERENCES pages(id)
);
`;

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database:', err.message);
        } else {
            console.log('✅ Database initialized successfully with ES Modules.');
        }
    });
});

db.close();