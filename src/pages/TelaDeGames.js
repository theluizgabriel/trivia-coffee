import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const NUMBER = 10;
const TIMER = 1000;
const FOUR = 4;
const TRES = 3;

class Games extends React.Component {
  state = {
    questions: [],
    loading: true,
    pergunta: 0,
    resposta: [],
    count: 30,
    placar: 0,
    toggle: false,
  }

  startTimeOut = () => setInterval(() => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  }, TIMER)

  fetchQuestions = async (token) => {
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
    this.setState((state) => ({
      toggle: false,
      pergunta: state.pergunta === FOUR ? FOUR : state.pergunta + 1,
    }));
    this.setState({ count: 30 });
    clearInterval(this.intervalID);
    this.intervalID = this.startTimeOut();
  }

  redirectToFeedback = () => {
    const { history } = this.props;
    history.push('/feedback');
  }

  changeColor = (e) => {
    this.setState({ count: 30, toggle: true });
    clearInterval(this.intervalID);
    this.sumScore(e);
  }

  // selectAnswer = () => {
  //   // clearInterval(this.intervalID);
  //   // this.setState({ count: 30 });
  //   // this.intervalID = this.startTimeOut();
  //   clearInterval(this.intervalID);
  // }

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

  positiveOrNegativeNumber = () => {
    const num = Math.floor(Math.random() * 2) - 1;
    console.log(num === 0 ? 1 : num);
    return num === 0 ? 1 : num;
  };

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
          .sort(() => this.positiveOrNegativeNumber())),
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

  toggleGreen = () => {
    const { toggle } = this.state;
    if (toggle) {
      return { border: '3px solid rgb(6, 240, 15)', backgroundColor: 'green' };
    }
    return { color: 'black' };
  }

  toggleSalmon = () => {
    const { toggle } = this.state;
    if (toggle) {
      return { border: '3px solid red', backgroundColor: 'salmon',
      };
    }
    return { color: 'black' };
  }

  render() {
    const { questions, loading, pergunta, resposta, count, toggle, placar } = this.state;
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
                        style={ this.toggleGreen() }
                        key={ resp.answer }
                        type="button"
                        data-testid="correct-answer"
                        id="correct-answer"
                        onClick={ this.changeColor }
                        disabled={ count === 0 }
                      >
                        {resp.answer}
                      </button>
                    )
                    : (
                      <button
                        style={ this.toggleSalmon() }
                        key={ resp.answer }
                        type="button"
                        data-testid={ `wrong-answer-${resp.id}` }
                        id={ `wrong-answer-${resp.id}` }
                        onClick={ this.changeColor }
                        disabled={ count === 0 }
                      >
                        {resp.answer}
                      </button>
                    )

                ))}
              </section>
              <button
                style={ !toggle ? { visibility: 'hidden' } : { color: 'black' } }
                data-testid={ toggle && 'btn-next' }
                type="button"
                onClick={
                  pergunta < FOUR ? this.changeAnswer : this.redirectToFeedback
                }
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
