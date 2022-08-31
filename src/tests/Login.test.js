import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const EMAIL = 'teste@teste.com';
const PASSWORD = '123456';
const TROLL = 'hue';

describe('Testando a aplicação na página de Login', () => {
  test('Testa se renderiza na rota certa "/"', () => {
    renderWithRouterAndRedux(<App />);
    const { history } = renderWithRouterAndRedux(<App />);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
  test('Testa se os inputs de email e senha estão na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/');

    const email = screen.getByLabelText(/email:/i);
    const password = screen.getByLabelText(/password:/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('Testa a Validação do botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/');

    const email = screen.getByLabelText(/email:/i);
    const password = screen.getByLabelText(/password:/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(email, TROLL);
    userEvent.type(password, TROLL);

    expect(button).toBeDisabled();

    userEvent.type(email, EMAIL);
    userEvent.type(password, PASSWORD);

    expect(button).toBeEnabled();
  });
  test('Testa o redirecionamento do Botão Entrar para a página com a rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/');

    const email = screen.getByLabelText(/email:/i);
    const password = screen.getByLabelText(/password:/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(email, EMAIL);
    userEvent.type(password, PASSWORD);
    userEvent.click(button);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });
});

describe('Testando a aplicação na tela Wallet', () => {
  test('Testa se as informações e os inputs aparecem corretamente na página Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/');

    const email = screen.getByLabelText(/email:/i);
    const password = screen.getByLabelText(/password:/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(email, EMAIL);
    userEvent.type(password, PASSWORD);
    userEvent.click(button);

    history.push('/carteira');

    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    const currencyField = screen.getByTestId('header-currency-field');
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpensesButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    const pageElements = [
      emailField,
      totalField,
      currencyField,
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
      addExpensesButton,
    ];

    pageElements.map((e) => expect(e).toBeInTheDocument());
  });
});
