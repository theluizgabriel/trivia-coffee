import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const NUMBER = 10;
const TRES = 3;
const TIMER = 1000;

class Games extends React.Component {
  state = {
    questions: [],
    loading: true,
    pergunta: 0,
    resposta: [],
    count: 30,
    placar: 0,
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
    clearInterval(this.intervalID);
    this.intervalID = this.startTimeOut();
  }

  selectAnswer = (e) => {
    console.log('oi');
    // clearInterval(this.intervalID);
    // this.setState({ count: 30 });
    // this.intervalID = this.startTimeOut();
    clearInterval(this.intervalID);
    this.sumScore(e);
  }

  sumScore = (e) => {
    const { count, questions, pergunta } = this.state;
    const timer = count;
    const { difficulty } = questions[pergunta];
    if (e.target.id === 'correct-answer') {
      if (difficulty === 'easy') {
        this.setState((prevState) => ({ placar:
        prevState.placar + NUMBER + (timer * 1) }));
      } else if (difficulty === 'medium') {
        this.setState((prevState) => ({ placar:
        prevState.placar + NUMBER + (timer * 2) }));
      } else if (difficulty === 'hard') {
        this.setState((prevState) => ({ placar:
        prevState.placar + NUMBER + (timer * TRES) }));
      }
    }
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
    const { questions, loading, pergunta, resposta, count, placar } = this.state;
    return (
      <>
        <Header placar={ placar } />
        <h2>{count}</h2>
        Trivia
        {
          loading ? <h2>Carregando...</h2> : (
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
                        id="correct-answer"
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
                        id={ `wrong-answer-${resp.id}` }
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
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Games.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Games);
