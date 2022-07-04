import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const { screen, waitFor } = require('@testing-library/react');
const responseAPI = {results: [ {
    category: "Entertainment: Books",
correct_answer: "Arthur Conan Doyle",
difficulty: "medium",
incorrect_answers:[ 
 "Graham Greene",
 "H G Wells",
 "Arthur C Clarke"],
question: "Which of the following authors was not born in England? ",
type: "multiple",}, {
    category: "Politics",
correct_answer: "True",
difficulty: "easy",
incorrect_answers: [
 "False"
],
question: "Former president Theodore Roosevelt (1900-1908)  ran for another term under the Progressive Party in 1912.",
type: "boolean"},
{
    category: "Entertainment: Curiosidades",
correct_answer: "Pé",
difficulty: "medium",
incorrect_answers:[ 
 "Mão",
 "Naris",
 "Orelhas"],
question: "Qual melhor lugar para se colocar o sapato? ",
type: "multiple",},
{
    category: "Entertainment: Fruits",
correct_answer: "Limão",
difficulty: "medium",
incorrect_answers:[ 
 "Banana",
 "Maçã",
 "Uva"],
question: "Que fruta daria uma boa limonada? ",
type: "multiple",}, {
    category: "Entertainment: Animais",
correct_answer: "Pato",
difficulty: "medium",
incorrect_answers:[ 
 "Cachorro",
 "Vaca",
 "Zezito"],
question: "Qual dos animais abaixo faz 'QUACK'? ",
type: "multiple",}]}

const initialState = {
    player: {
        name:"Nestor",
assertions:'',
score:10,
gravatarEmail:"Nestor@email.com",
    }

}

beforeEach(() => {
    jest.useFakeTimers()
    window.localStorage.setItem('token', 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6')
    jest.spyOn(global, 'fetch')
    .mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI),
    });
})
 

test('Teste se a tela de Game é renderizada corretamente', async () => {

    
   renderWithRouterAndRedux(<App />,initialState, '/teladegames' )
  
    const titulo = screen.getByText(/trivia/i);
    expect(titulo).toBeInTheDocument()
    expect(await screen.findByText(/Which of the following authors was not born in England?/i, {},{timeout: 5000})).toBeInTheDocument()
    const respostaCerta = screen.getByRole('button', { name: /Arthur Conan Doyle/i });
    expect(respostaCerta).toBeInTheDocument()
    userEvent.click(respostaCerta);
    const botaoNext = screen.getByRole('button', { name: /Próximo/i });
    expect(botaoNext).toBeInTheDocument()
    expect(respostaCerta).toHaveStyle('border: 3px solid rgb(6, 240, 15)','backgroundColor: green')

    userEvent.click(botaoNext);
    jest.advanceTimersByTime(30000)
        const respostaTrue= screen.getByRole('button', { name: /True/i });
    expect(respostaTrue).toBeDisabled()
    
    expect(global.fetch).toBeCalledTimes(1);
    

});



test('Teste so placar funciona corretamente', async () => {
    
    renderWithRouterAndRedux(<App />,initialState, '/teladegames' )
   
     expect(await screen.findByText(/Which of the following authors was not born in England?/i, {},{timeout: 5000})).toBeInTheDocument()
     const respostaCerta = screen.getByRole('button', { name: /Arthur Conan Doyle/i });
     userEvent.click(respostaCerta);
     const botaoNext = screen.getByRole('button', { name: /Próximo/i });
     userEvent.click(botaoNext);
     const botaoCerto = screen.getByTestId('correct-answer')
     userEvent.click(botaoCerto)
     userEvent.click(botaoNext)
     userEvent.click(botaoCerto)
     userEvent.click(botaoNext)
     userEvent.click(botaoCerto)
     userEvent.click(botaoNext)
     userEvent.click(botaoCerto)
     userEvent.click(botaoNext)
     const titulo = screen.getByTestId('feedback-text')
     expect(titulo).toBeInTheDocument();
     const player = screen.getByText('Well Done!');
     expect(player).toBeInTheDocument();    });
     
