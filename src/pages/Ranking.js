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
    <div className="mainRanking">
      <div className="organizationRanking">
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((item, index) => (
          <><div className="divRank" key={item.name}>
            <p data-testid={`player-name-${index}`}>{item.name}</p>
            <img className="imgRanking" src="https://www.gravatar.com/avatar/44fbd5fbb3cca8c64bd083dfbc852a3f" alt="Perfil" />
            <p data-testid={`player-score-${index}`}>{item.score}</p>
          </div><hr /></>
        ))}
      </div>
      <div className="divBtn">
      <button
        className="buttons"
        type="button"
        data-testid="btn-go-home"
        onClick={ () => history.push('./') }
      >
        Go Login

      </button>
      </div>
    </div>
  );
}
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
