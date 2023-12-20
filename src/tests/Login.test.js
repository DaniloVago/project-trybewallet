import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste da página de Login', () => {
  it('Testa se a página contém um Login, dois inputs e um botão', () => {
    renderWithRouterAndRedux(<App />);
    // Acessar
    const h1Login = screen.getByRole('heading', {
      name: /login/i,
    });
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', {
      name: /entrar/i,
    });
    // Agir
    // Aferir
    expect(h1Login).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });
  it('Testa se da para clicar nos dois inputs e no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(inputEmail, 'danilo_dias07@hotmail.com');
    expect(inputEmail).toHaveDisplayValue('danilo_dias07@hotmail.com');
    userEvent.type(inputPassword, '123456');
    expect(inputPassword).toHaveDisplayValue('123456');
    userEvent.click(buttonLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
