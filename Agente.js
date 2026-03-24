// Agente.js - Teste Shader
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;
const dbPath = path.resolve(__dirname, 'meu_primeiro_banco.db');

// --- Configuração do Banco de Dados ---
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Erro ao abrir o banco SQLite:', err.message);
    } else {
        console.log('✅ Conectado ao banco SQLite em:', dbPath);
        // Criar tabela de logs se não existir
        db.run(`CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT,
      mensagem TEXT
    )`);
    }
});

// --- Rota Principal (O que aparece no site) ---
app.get('/', (req, res) => {
    const agora = new Date().toISOString();
    const msgLog = 'Nova visualização da página principal do Shader.';

    // Salvar registro no banco
    db.run(`INSERT INTO logs (data, mensagem) VALUES (?, ?)`, [agora, msgLog], (err) => {
        if (err) {
            console.error('❌ Erro ao salvar log:', err.message);
        } else {
            console.log(`📝 Log salvo: ${agora}`);
        }
    });

    // Resposta bonita para o navegador
    res.send(`
    <html>
      <head>
        <title>Shader Teste</title>
        <style>
          body { font-family: sans-serif; background-color: #f4f4f4; text-align: center; padding-top: 100px; }
          .container { background-color: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: inline-block; }
          h1 { color: #2ecc71; }
          p { color: #555; }
          .log-msg { font-size: 0.9em; color: #888; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Olá do Shader!</h1>
          <p>O seu Agente.js está <strong>ONLINE</strong> na Hostinger.</p>
          <p class="log-msg">Registro criado no banco SQLite em: ${agora}</p>
        </div>
      </body>
    </html>
  `);
});

// --- Iniciar o Servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor Shader rodando localmente na porta ${PORT}`);
    console.log(`🔗 Teste abrindo: http://localhost:${PORT}`);
});