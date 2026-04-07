import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('./database.db');
const htmlPath = path.resolve('./raw_page.html');

if (!fs.existsSync(htmlPath)) {
    console.error('❌ Error: raw_page.html not found.');
    process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const db = new sqlite3.Database(dbPath);

const slug = 'home';
const title = 'House Mazzutti - Home Page';

db.serialize(() => {
    // Check if table exists (handled by init_db.js usually, but being safe)
    db.run(`
        CREATE TABLE IF NOT EXISTS pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE,
            title TEXT,
            content TEXT,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Upsert the page content
    const stmt = db.prepare(`
        INSERT INTO pages (slug, title, content, last_updated)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(slug) DO UPDATE SET
            title = excluded.title,
            content = excluded.content,
            last_updated = excluded.last_updated
    `);

    stmt.run(slug, title, htmlContent, (err) => {
        if (err) {
            console.error('❌ Error saving to database:', err.message);
        } else {
            console.log('✅ Page synchronized successfully in database.db');
        }
    });

    stmt.finalize();
});

db.close();
