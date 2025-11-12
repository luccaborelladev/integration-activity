// backend/__tests__/userRoutes.test.js
const request = require('supertest');
const app = require('../index'); // Nosso servidor Express
const userData = require('../src/data'); // Importa o "banco de dados"

describe('Integração das rotas de usuários', () => {

  // Limpa os usuários antes de cada teste para garantir um estado limpo
  beforeEach(() => {
    userData.clearUsers();
  });

  it('Deve criar um novo usuário e retornar status 201', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Marcos Teste', email: 'marcos.teste@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Marcos Teste');
    expect(res.body.email).toBe('marcos.teste@example.com');
  });

  it('Deve retornar 400 se o nome ou email estiverem faltando ao criar usuário', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Usuário Sem Email' }); // Faltando email

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Nome e email são obrigatórios.');
  });

  it('Deve listar os usuários', async () => {
    // Primeiro, cria um usuário para ter algo para listar
    await request(app)
      .post('/users')
      .send({ name: 'Maria', email: 'maria@example.com' });

    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Maria');
  });

  it('Deve retornar detalhes de um usuário específico', async () => {
    // Primeiro, cria um usuário
    const createUserRes = await request(app)
      .post('/users')
      .send({ name: 'João', email: 'joao@example.com' });
    const userId = createUserRes.body.id;

    // Em seguida, busca por ID
    const getUserRes = await request(app).get(`/users/${userId}`);
    expect(getUserRes.statusCode).toBe(200);
    expect(getUserRes.body.id).toBe(userId);
    expect(getUserRes.body.name).toBe('João');
  });

  it('Deve retornar 404 para um usuário não encontrado', async () => {
    const res = await request(app).get('/users/nonexistent-id');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Usuário não encontrado.');
  });
});