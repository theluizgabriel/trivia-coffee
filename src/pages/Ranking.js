import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Ranking(props) {
  const { history } = props;
  const dataGravatar = [];

  useEffect(() => {
    localStorage.setItem('rankin', dataGravatar);
  }, []);

  return (
    <>
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => history.push('./login') }
      >
        Go Login

      </button>
      {dataGravatar.map((item, index) => (
        <div key={ item.name }>
          <p data-testid={ `player-name-${index}` }>{item.name}</p>
          <p data-testid={ `player-score-${index}` }>{item.score}</p>
        </div>
      ))}
    </>
  );
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
