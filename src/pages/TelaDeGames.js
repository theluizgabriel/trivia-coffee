import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

const NUMBER = 10;

export default class Games extends React.Component {
  state = {
    questions: [],
    loading: true,
    pergunta: 0,
    resposta: [],
  }

  fetchQuestions = (token) => {
    const { history } = this.props;
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          localStorage.removeItem('token');
          history.push('/');
        }
        return data.results;
      });
  };

  changeAnswer = () => {
    this.setState((state) => ({ pergunta: state.pergunta + 1 }));
  }

  componentDidMount = async () => {
    const savedToken = localStorage.getItem('token');
    const questions = await this.fetchQuestions(savedToken);
    this.setState({
      questions,
      loading: false,
      resposta: questions.map((question) => {
        if (question.type === 'boolean') {
          return [
            { answer: question.correct_answer },
            { answer: question.incorrect_answers[0],
              id: 0 },
          ];
        }
        return [
          { answer: question.correct_answer },
          { answer: question.incorrect_answers[0],
            id: 0 },
          { answer: question.incorrect_answers[1],
            id: 1 },
          { answer: question.incorrect_answers[2],
            id: 2 },
        ];
      }),
    });
  }

  render() {
    const { questions, loading, pergunta, resposta } = this.state;
    return (
      <>
        <Header />
        <h1>RONALDO</h1>
        Trivia
        {
          loading ? <h2>Carregando...</h2> : (
            <>
              {console.log(questions)}
              <>
                <p data-testid="question-category">{questions[pergunta].category}</p>
                <h3 data-testid="question-text">{questions[pergunta].question}</h3>
                <section data-testid="answer-options">
                  {(resposta[pergunta]
                    .sort(() => (Math.random() * NUMBER) - 1)).map((resp) => (
                    resp.answer === questions[pergunta].correct_answer
                      ? (
                        <button
                          key={ resp.answer }
                          type="button"
                          data-testid="correct-answer"
                          onClick={ this.changeAnswer }
                        >
                          {resp.answer}
                        </button>
                      )
                      : (
                        <button
                          key={ resp.answer }
                          type="button"
                          data-testid={ `wrong-answer-${resp.id}` }
                          onClick={ this.changeAnswer }
                        >
                          {resp.answer}
                        </button>
                      )

                  ))}
                </section>
              </>

            </>
          )
        }
      </>
    );
  }
}
Games.propTypes = {
  history: PropTypes.func.isRequired,
};
