import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const {  screen } = require('@testing-library/react');

const response = {
  response_code: 0,
  response_message: 'Token Generated Successfully!',
  token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
};
const pName = 'input-player-name';
const email = 'input-gravatar-email';
test('Teste se a página contem um input de loguin, e um de email', () => {
renderWithRouterAndRedux(
      <App />
  );

  const aboutText = screen.getByTestId(pName);
  const aboutEmail = screen.getByTestId(email);
  expect(aboutText).toBeInTheDocument();
  expect(aboutEmail).toBeInTheDocument();
});

test('Teste se a página contem 2 Botões com a palavra Play, e Configuração', () => {
  renderWithRouterAndRedux(
    <App />
);
  const loginButton = screen.getByRole('button', { name: /play/i });
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeDisabled()
  const configButton = screen.getByRole('button', { name: /Configuração/i });
  expect(configButton).toBeInTheDocument();
});

test('Teste se o Botão de Configuração, leva para pagina de Configuração', async () => {
  renderWithRouterAndRedux(
    <App />
);
  const configButton = screen.getByRole('button', { name: /Configuração/i });
  userEvent.click(configButton);

  const configPage = screen.getByText(/configuração/i);
  expect(configPage).toBeInTheDocument();
});

export default test('Teste se a função fecth para a API é chamada', async () => {

  jest.spyOn(global, 'fetch')
    .mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
    });

    renderWithRouterAndRedux(
      <App />
  );
  
  const aboutText = screen.getByTestId(pName);
  const aboutEmail = screen.getByTestId(email);
  const PlayButton = screen.getByRole('button', { name: /play/i });
  userEvent.type(aboutText, 'Zezito');
  expect(aboutText).toHaveValue('Zezito');
  userEvent.type(aboutEmail, 'zezito@gmail.com');
  expect(aboutEmail).toHaveValue('zezito@gmail.com')
  userEvent.click(PlayButton);

  const gamePage = await screen.findByText(/trivia/i);
  expect(gamePage).toBeInTheDocument();
  expect(global.fetch).toBeCalledTimes(1);

  global.fetch.mockRestore();
});