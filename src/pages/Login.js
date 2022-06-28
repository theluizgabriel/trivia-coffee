import React, { useState } from 'react';

export default function Login() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    const { name } = event.target;
    if (name === 'name') return setNome(event.target.value);
    if (name === 'email') return setEmail(event.target.value);
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
      >
        Play
      </button>
    </>
  );
}
