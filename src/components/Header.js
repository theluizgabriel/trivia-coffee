import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

function Header(props) {
  const { name, email, score } = props;
  const getImage = (e) => {
    console.log(name, email, score);
    const emailUser = md5(e).toString();
    return emailUser;
  };
  return (
    <div>
      <img
        src={ `https://www.gravatar.com/avatar/${getImage(email)}` }
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
        {score}
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
