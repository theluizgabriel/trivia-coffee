import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Feedback(props) {
  const tres = 3;
  const { scores, assertionss, history } = props;
  const isScorePoints = () => {
    if (assertionss < tres) return 'Could be better...';
    if (assertionss >= tres) return 'Well Done!';
  };
  return (
    <>
      <Header placar={ scores } />
      <h4
        data-testid="feedback-text"
      >
        {isScorePoints()}
      </h4>
      <h4 data-testid="feedback-total-score">{scores}</h4>
      <h4 data-testid="feedback-total-question">{assertionss}</h4>
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => history.push('./') }
      >
        Play Again

      </button>
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ () => history.push('./ranking') }
      >
        Tela de Ranking
      </button>
    </>
  );
}

const mapStateToProps = (state) => ({
  scores: state.player.score,
  assertionss: state.player.assertions,
  names: state.player.name,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
