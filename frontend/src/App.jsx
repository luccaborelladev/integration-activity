// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Opcional, para estilização

const API_URL = 'http://localhost:3000/users'; // URL do nosso backend

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [message, setMessage] = useState('');

  // Função para carregar usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Carrega usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para criar um novo usuário
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
      setMessage('Usuário criado com sucesso!');
      setTimeout(() => setMessage(''), 3000); // Limpa a mensagem após 3 segundos
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setMessage('Erro ao criar usuário.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Função para buscar detalhes de um usuário
  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setSelectedUserDetails(response.data);
      setSelectedUserId(id);
    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
      setSelectedUserDetails(null);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="App">
      <h1>Gerenciamento de Usuários</h1>

      {message && <p className="message">{message}</p>}

      {/* Formulário para Criar Usuário */}
      <section>
        <h2>Criar Novo Usuário</h2>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <button type="submit">Adicionar Usuário</button>
        </form>
      </section>

      {/* Lista de Usuários */}
      <section>
        <h2>Lista de Usuários</h2>
        {users.length === 0 ? (
          <p>Nenhum usuário cadastrado.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
                <button onClick={() => fetchUserDetails(user.id)}>Ver Detalhes</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Detalhes do Usuário Selecionado */}
      {selectedUserDetails && (
        <section>
          <h2>Detalhes do Usuário: {selectedUserDetails.name}</h2>
          <p>ID: {selectedUserDetails.id}</p>
          <p>Email: {selectedUserDetails.email}</p>
          <button onClick={() => setSelectedUserDetails(null)}>Fechar Detalhes</button>
        </section>
      )}
    </div>
  );
}

export default App;