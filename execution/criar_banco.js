const sqlite3 = require('sqlite3').verbose();

// Isso cria (ou abre) o arquivo de banco de dados
const db = new sqlite3.Database('./meu_primeiro_banco.db', (err) => {
    if (err) {
        return console.error("ERRO ao criar o banco:", err.message);
    }
    console.log("SUCESSO: O arquivo do banco de dados foi criado!");
});

// Aqui a gente cria uma tabelinha de teste
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT)");

    // Vamos inserir um nome só para testar
    db.run("INSERT INTO usuarios (nome) VALUES ('Seu Nome Aqui')");

    console.log("TABELA criada e dados inseridos com sucesso!");
});

db.close();