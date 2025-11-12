// frontend/src/App.test.jsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'; // Importa vi de vitest para mockar
import App from './App';
import axios from 'axios';

// Mockar o módulo axios
vi.mock('axios');

describe('Componente App (Frontend)', () => {

  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Deve exibir lista de usuários ao carregar a página', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ id: '1', name: 'Marcos', email: 'marcos@example.com' }]
    });

    render(<App />);

    expect(screen.getByText('Gerenciamento de Usuários')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Marcos (marcos@example.com)')).toBeInTheDocument());
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');
  });

  test('Deve permitir criar um novo usuário e exibi-lo na lista', async () => {
    // Mock inicial para a lista vazia
    axios.get.mockResolvedValueOnce({ data: [] });
    // Mock para a requisição POST
    axios.post.mockResolvedValueOnce({
      data: { id: '2', name: 'Ana', email: 'ana@example.com' }
    });
    // Mock para a requisição GET após a criação (atualização da lista)
    axios.get.mockResolvedValueOnce({
      data: [{ id: '2', name: 'Ana', email: 'ana@example.com' }]
    });


    render(<App />);

    // Garante que a lista inicial é carregada (e está vazia no mock)
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Preenche o formulário
    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ana@example.com' } });

    // Envia o formulário
    fireEvent.click(screen.getByText('Adicionar Usuário'));

    // Verifica se a requisição POST foi feita
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users', {
      name: 'Ana',
      email: 'ana@example.com'
    }));

    // Verifica se a mensagem de sucesso aparece
    expect(screen.getByText('Usuário criado com sucesso!')).toBeInTheDocument();

    // Verifica se o novo usuário aparece na lista após o recarregamento
    await waitFor(() => expect(screen.getByText('Ana (ana@example.com)')).toBeInTheDocument());
  });

  test('Deve exibir detalhes de um usuário específico ao clicar no botão', async () => {
    const mockUser = { id: '3', name: 'Carlos', email: 'carlos@example.com' };
    // Mock para a lista inicial
    axios.get.mockResolvedValueOnce({ data: [mockUser] });
    // Mock para os detalhes do usuário
    axios.get.mockResolvedValueOnce({ data: mockUser });

    render(<App />);

    // Espera a lista carregar e o botão "Ver Detalhes" aparecer
    await waitFor(() => expect(screen.getByText('Carlos (carlos@example.com)')).toBeInTheDocument());
    const viewDetailsButton = screen.getByRole('button', { name: 'Ver Detalhes' });
    expect(viewDetailsButton).toBeInTheDocument();

    // Clica no botão "Ver Detalhes"
    fireEvent.click(viewDetailsButton);

    // Verifica se a requisição GET para detalhes foi feita
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/users/${mockUser.id}`));

    // Verifica se os detalhes são exibidos
    expect(screen.getByText(`Detalhes do Usuário: ${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`ID: ${mockUser.id}`)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
  });
});