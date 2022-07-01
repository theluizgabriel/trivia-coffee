import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Feedback(props) {
  const tres = 3;
  const { score, assertions, history } = props;
  const isScorePoints = () => {
    if (score < tres) return 'Could be better...';
    if (score >= tres) return 'Well Done!';
  };
  return (
    <>
      <img
        data-testid="header-profile-picture"
        alt="foto perfil"
        src="*"
      />
      <h2
        data-testid="header-player-name"
      >
        Nome pessoa

      </h2>
      <h4
        data-testid="header-score"
      >
        Placar
      </h4>
      <h4
        data-testid="feedback-text"
      >
        {isScorePoints}
      </h4>
      <h4 data-testid="feedback-total-score">{score}</h4>
      <h4 data-testid="feedback-total-question">{assertions}</h4>
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => history.push('./login') }
      >
        Play Again

      </button>
      <button
        type="button"
        data-testid="btn-ranking"
      >
        Tela de Ranking
      </button>
    </>
  );
}

const mapStateToProps = (state) => ({
  score: state.user.score,
  assertions: state.user.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);