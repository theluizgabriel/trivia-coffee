import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

const NUMBER = 10;
const TIMER = 1000;

export default class Games extends React.Component {
  state = {
    questions: [],
    loading: true,
    pergunta: 0,
    resposta: [],
    count: 30,
  }

  startTimeOut = () => setInterval(() => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  }, TIMER)

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
    this.setState({ count: 30 });
    this.intervalID = this.startTimeOut();
  }

  selectAnswer = () => {
    // clearInterval(this.intervalID);
    // this.setState({ count: 30 });
    // this.intervalID = this.startTimeOut();
    clearInterval(this.intervalID);
  }

  componentDidMount = async () => {
    this.intervalID = this.startTimeOut();
    const savedToken = localStorage.getItem('token');
    const questions = await this.fetchQuestions(savedToken);
    this.setState({
      questions,
      loading: false,
      resposta: (questions.map((question) => {
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
      })),
    }, () => {
      this.setState((prevState) => ({
        resposta: prevState.resposta.map((resp) => resp
          .sort(() => (Math.random() * NUMBER) - 1)),
      }));
    });
    // const respostasAleatorias = { respostas }
  }

  componentDidUpdate = () => {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.intervalID);
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalID);
  }

  render() {
    const { questions, loading, pergunta, resposta, count } = this.state;
    return (
      <>
        <Header />
        <h1>RONALDO</h1>
        <h2>{count}</h2>
        Trivia
        {
          loading ? <h2>Carregando...</h2> : (
            <>
              {console.log(questions)}
              <>
                <p data-testid="question-category">{questions[pergunta].category}</p>
                <h3 data-testid="question-text">{questions[pergunta].question}</h3>
                <section data-testid="answer-options">
                  {resposta[pergunta].map((resp) => (
                    resp.answer === questions[pergunta].correct_answer
                      ? (
                        <button
                          key={ resp.answer }
                          type="button"
                          data-testid="correct-answer"
                          onClick={ this.selectAnswer }
                          disabled={ count === 0 }
                        >
                          {resp.answer}
                        </button>
                      )
                      : (
                        <button
                          key={ resp.answer }
                          type="button"
                          data-testid={ `wrong-answer-${resp.id}` }
                          onClick={ this.selectAnswer }
                          disabled={ count === 0 }
                        >
                          {resp.answer}
                        </button>
                      )

                  ))}
                </section>
                <button
                  type="button"
                  onClick={ this.changeAnswer }
                >
                  Próximo
                </button>
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
