// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const userData = require('../data'); // Nosso "banco de dados" em memória

// Middleware para parsear JSON no corpo da requisição
router.use(express.json());

// GET /users - Retorna a lista de usuários
router.get('/', (req, res) => {
  res.status(200).json(userData.getUsers());
});

// POST /users - Cria um novo usuário
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
  }
  const newUser = { id: uuidv4(), name, email };
  userData.addUser(newUser);
  res.status(201).json(newUser);
});

// GET /users/:id - Retorna detalhes de um usuário específico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = userData.getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' });
  }
});

module.exports = router;