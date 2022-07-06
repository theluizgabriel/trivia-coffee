import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

const tres = 3;
class Feedback extends React.Component {
  isScorePoints = () => {
    const { assertionss } = this.props;
    if (assertionss < tres) return 'Você não tomou café 🙄';
    if (assertionss >= tres) return 'Você tomou café ☕😁';
  };

  getImage = (e) => {
    const emailUser = md5(e).toString();
    return emailUser;
  };

  saveInfos = () => {
    const { score, name, email } = this.props;
    const rankingAnterior = localStorage.getItem('ranking');
    const newInfo = { name, foto: `https://www.gravatar.com/avatar/${this.getImage(email)}`, score };
    if (rankingAnterior === null) {
      localStorage.setItem('ranking', JSON.stringify([newInfo]));
    } else {
      const parse = JSON.parse(rankingAnterior);
      console.log(parse);
      localStorage
        .setItem('ranking', JSON.stringify([...parse, newInfo]));
    }
    return { infos: newInfo };
  };

  render() {
    const { score, assertionss, history } = this.props;
    return (
      <div className="containerGame">
      <div className="divMain">
        <Header />
        <hr className="hrGame"></hr>
        <div className="gameScreenDiv">
          <h4
            className="feedback-text"
            data-testid="feedback-text"
          >
            {this.isScorePoints()}
          </h4>
          <h4
          data-testid="feedback-total-score"
          className="total-score-question"
          >
            Pontos: {score}
            </h4>
          <h4
          data-testid="feedback-total-question"
          className="total-score-question"
          >
            Acertou {assertionss} questões
            </h4>
          <div className="divBtn">
          <button
            className="buttons"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              history.push('./');
              this.saveInfos();
            } }
          >
            Jogar novamente

          </button>
          <button
            className="buttons"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              history.push('./ranking');
              this.saveInfos();
            } }
          >
            Ranking
          </button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertionss: state.player.assertions,
  name: state.player.name,
  foto: state.player.gravatarEmail,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
