import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer } from '../redux/actions/index.action';
import '../index.css';

function Login(props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const { history, player } = props;
  const fetchApi = () => (
    fetch('https://opentdb.com/api_token.php?command=request').then((res) => res.json()).catch((error) => error)
  );
  const handleChange = (event) => {
    const { name } = event.target;
    if (name === 'name') return setNome(event.target.value);
    if (name === 'email') return setEmail(event.target.value);
  };

  const handleButtonClick = async () => {
    const token = await fetchApi();
    localStorage.setItem('token', token.token);
    history.push('./teladegames');
  };
  return (
    <div
      className="container"
    >
      <main>
        <form>
          <h1 className="title">
            Trivia do 21
          </h1>
          <div className="divInputs">
            <input
              className="inputs"
              type="text"
              name="name"
              placeholder="Nome"
              value={ nome }
              data-testid="input-player-name"
              onChange={ handleChange }
            />
            <input
              className="inputs"
              type="email"
              name="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
              onChange={ handleChange }
              value={ email }
            />
          </div>
          <div className="divBtn">
            <button
              id="btnLogin"
              className="buttons"
              type="button"
              data-testid="btn-play"
              disabled={ nome.length === 0 || email.length === 0 }
              onClick={ () => { player(nome, email); handleButtonClick(); } }
            >
              Login
            </button>
            <button
              className="buttons"
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('./configuracao') }
            >
              Configuração
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  player: (nome, email) => dispatch(addPlayer(nome, email)),
});

Login.propTypes = {
  history: PropTypes.func,
  player: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
