// import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Games extends React.Component {
  state = {
    questions: [],
    loading: true,
    redirect: false,
  }

  fetchQuestions = (token) => (
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => data.results)
      .catch(function oi() {
        this.setState({ redirect: true });
      })
  );

  componentDidMount = async () => {
    console.log('did');
    const savedToken = localStorage.getItem('token');
    const questions = await this.fetchQuestions(savedToken);
    this.setState({
      questions,
      loading: false,
    });
  }

  render() {
    const { questions, loading, redirect } = this.state;
    return (
      <>
        <h1>RONALDO</h1>
        Trivia
        {
          loading ? <h2>Carregando...</h2> : (
            <>
              <p data-testid="question-category">{questions[0].category}</p>
              <h3 data-testid="question-text">{questions[0].question}</h3>
              <section data-testid="answer-options">
                <button type="button" data-testid="correct-answer">
                  {questions[0].correct_answer}
                </button>
                <button type="button" data-testid={ `wrong-answer-${0}` }>
                  {questions[0].incorrect_answers[0]}
                </button>
                <button type="button" data-testid={ `wrong-answer-${1}` }>
                  {questions[0].incorrect_answers[1]}
                </button>
                <button type="button" data-testid={ `wrong-answer-${2}` }>
                  {questions[0].incorrect_answers[2]}
                </button>
              </section>
            </>
          )
        }
        {redirect && <Redirect to="/" />}
      </>
    );
  }
}

// Games.propTypes = {
//   history: PropTypes.func.isRequired,
// };
