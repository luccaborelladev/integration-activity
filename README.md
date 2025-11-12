# Atividade: Teste de Integração entre Frontend e Backend

Este repositório contém a resolução da atividade de Laboratório de Desenvolvimento de Software, que consiste na criação de um backend (API), um frontend (interface de usuário) e testes de integração ponta a ponta (E2E) para validar a comunicação entre eles.

## Requisitos Técnicos Utilizados

### Backend
*   **Linguagem:** Node.js
*   **Framework:** Express.js
*   **Testes:** Jest, Supertest
*   **Outros:** `uuid` para geração de IDs únicos, `cors` para permitir comunicação com o frontend.

### Frontend
*   **Framework:** React (com Vite)
*   **Biblioteca HTTP:** Axios
*   **Testes:** Vitest, React Testing Library
*   **Testes E2E:** Cypress

## Como Rodar o Projeto

Para executar o projeto, siga os passos abaixo:

### 1. Iniciar o Backend

Abra um terminal no diretório `integration-activity/backend`.

```bash
cd backend
npm install
npm start
O backend estará rodando em http://localhost:3000. Deixe este terminal aberto

2. Iniciar o Frontend
Abra um novo terminal no diretório integration-activity/frontend.



cd frontend
npm install
npm run dev
O frontend estará acessível em http://localhost:5173 (ou outra porta indicada pelo Vite). Deixe este terminal aberto.

Como Rodar os Testes

1. Testes de Integração do Backend
No terminal onde o backend está rodando (ou em um novo terminal na pasta backend):


cd backend
npm test
Você verá os resultados dos testes Jest/Supertest.

2. Testes de Integração do Frontend
No terminal onde o frontend está rodando (ou em um novo terminal na pasta frontend):



cd frontend
npm test
Você verá os resultados dos testes Vitest/React Testing Library.

3. Testes Ponta a Ponta (E2E) com Cypress
Certifique-se de que tanto o Backend quanto o Frontend estejam rodando.

Abra um novo terminal no diretório integration-activity/frontend.


cd frontend
npx cypress open
A interface do Cypress será aberta. Clique em "E2E Testing" e selecione o arquivo user_integration.cy.js para executar os testes no navegador.

Resultados e Observações
Backend: A API oferece as rotas GET/POST/GET(id) esperadas, com tratamento básico de erros e testes cobrindo esses fluxos.

Frontend: A interface React consome a API, permitindo listar, criar e visualizar detalhes de usuários. Os testes de componente validam o comportamento da interface.

E2E: Os testes Cypress simulam um usuário real, confirmando que a criação de um usuário no frontend resulta na persistência no backend e na atualização correta da interface, demonstrando a integração completa do sistema.
