// backend/src/data.js
const users = [];

const getUsers = () => users;

const getUserById = (id) => users.find(user => user.id === id);

const addUser = (user) => {
  users.push(user);
};

const clearUsers = () => { // Função para limpar os usuários, útil para testes
  users.length = 0;
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  clearUsers
};