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
