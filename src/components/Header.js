import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { addScore } from '../redux/actions/index.action';

class Header extends React.Component {
  getImage = (e) => {
    const { name, email, score } = this.props;
    console.log(name, email, score);
    const emailUser = md5(e).toString();
    return emailUser;
  };

  setScore = () => {
    const { placarFunc, placar } = this.props;
    placarFunc(placar);
    console.log(placar);
  };

  componentDidUpdate = () => {
    this.setScore();
  };

  render() {
    const { name, placar, email } = this.props;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${this.getImage(email)}` }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          {name}
        </p>
        <p data-testid="header-score">
          Score:
          {placar}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  placarFunc: (placarNovo) => dispatch(addScore(placarNovo)),
});

Header.propTypes = {
  dispatch: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
  placarFunc: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
