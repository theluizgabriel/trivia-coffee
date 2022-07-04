import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const { screen } = require('@testing-library/react');

const initialState = {
    player: {
        name:"zezito",
assertions:2,
score:100,
gravatarEmail:"zezito@superemail.com",
    }
}

const initialState2 = {
    player: {
        name:"Nestor",
assertions:4,
score:200,
gravatarEmail:"Nestor@superemail.com",
    }

} 

test('Teste se os elementos do Player na pagina Feedback aparecem na tela', async () => {
    
   renderWithRouterAndRedux(<App />,initialState, '/feedback' )
  
    const titulo = screen.getByTestId('feedback-text')
    expect(titulo).toBeInTheDocument();
    const player = screen.getByText('zezito');
    expect(player).toBeInTheDocument();
    const pontos = screen.getByTestId('feedback-total-score');
    expect(pontos).toBeInTheDocument();
    const questions = screen.getByTestId('feedback-total-question');
    expect(questions).toBeInTheDocument();

});

test('Teste se o botão PLAY AGAIN na pagina Feedback funcionam corretamente', async () => {

    renderWithRouterAndRedux(<App />,initialState, '/feedback' )

    const btPlayAgain = screen.getByRole('button', { name: /play again/i});
    expect(btPlayAgain).toBeInTheDocument()

    userEvent.click(btPlayAgain);
    const login = screen.getByTestId('input-player-name')
    expect(login).toBeInTheDocument()


});

test('Teste se o botão Tela de Ranking na pagina Feedback funcionam corretamente', async () => {

    renderWithRouterAndRedux(<App />,initialState, '/feedback' )

    const btRanking = screen.getByRole('button', { name: /tela de ranking/i});
    expect(btRanking).toBeInTheDocument()

    userEvent.click(btRanking);
    const rank= screen.getByRole('heading', {name: /ranking/i})
    expect(rank).toBeInTheDocument()
    const goLogin = screen.getByRole('button', { name: /go login/i});
    expect(goLogin).toBeInTheDocument()

    userEvent.click(goLogin);

    const login = screen.getByTestId('input-player-name')
    expect(login).toBeInTheDocument()


});

test('Teste se a mensagem WELL DO NE aparece na pagina Feedback', async () => {
    
    renderWithRouterAndRedux(<App />,initialState2, '/feedback' )
   
     const player = screen.getByText('Well Done!');
     expect(player).toBeInTheDocument();
     const pontos = screen.getByTestId('feedback-total-score');
     expect(pontos).toBeInTheDocument();
     const questions = screen.getByTestId('feedback-total-question');
     expect(questions).toBeInTheDocument();
 
 });
 