import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
state = {
  ranking: [],
}

componentDidMount() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  const rankingOrganizado = ranking.sort((a, b) => b.score - a.score);
  this.setState({ ranking: rankingOrganizado });
}

render() {
  const { history } = this.props;
  const { ranking } = this.state;
  return (
    <>
      <h1 data-testid="ranking-title">Ranking</h1>
      {ranking.map((item, index) => (
        <div key={ item.name }>
          <p data-testid={ `player-name-${index}` }>{item.name}</p>
          <img src={ item.foto } alt="Perfil" />
          <p data-testid={ `player-score-${index}` }>{item.score}</p>
        </div>
      ))}
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => history.push('./') }
      >
        Go Login

      </button>
    </>
  );
}
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
