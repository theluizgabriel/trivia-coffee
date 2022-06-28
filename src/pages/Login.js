import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Login(props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const { history } = props;
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
    <>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={ nome }
        data-testid="input-player-name"
        onChange={ handleChange }
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        data-testid="input-gravatar-email"
        onChange={ handleChange }
        value={ email }
      />
      <button
        type="button"
        data-testid="btn-play"
        disabled={ nome.length === 0 || email.length === 0 }
        onClick={ handleButtonClick }
      >
        Play
      </button>
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ () => history.push('./configuracao') }
      >
        Configuração
      </button>
    </>
  );
}
Login.propTypes = {
  history: PropTypes.func,
}.isRequired;
