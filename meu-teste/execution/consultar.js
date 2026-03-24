const sqlite3 = require('sqlite3').verbose();

// Abre o banco que a gente criou antes
const db = new sqlite3.Database('./meu_primeiro_banco.db', (err) => {
    if (err) return console.error(err.message);
});

console.log("--- LISTA DE USUÁRIOS NO BANCO ---");

// Comando SQL para pegar tudo da tabela
db.all("SELECT * FROM usuarios", [], (err, rows) => {
    if (err) {
        throw err;
    }
    // Mostra cada linha que ele achar
    rows.forEach((row) => {
        console.log(`ID: ${row.id} | Nome: ${row.nome}`);
    });
});

db.close();