// backend/index.js
const express = require('express');
const cors = require('cors'); // Para permitir requisições do frontend
const userRoutes = require('./src/routes/userRoutes');
const userData = require('./src/data'); // Importa para poder limpar em testes se necessário

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Rotas da API de usuários
app.use('/users', userRoutes);

// Exportar o app para os testes
if (process.env.NODE_ENV !== 'test') { // Para não iniciar o servidor durante testes
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

// Expor o app e a função clearUsers para testes
module.exports = app;