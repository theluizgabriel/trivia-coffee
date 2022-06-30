export const addPlayer = (name, email) => ({ type: 'ADD_PLAYER',
  payload: { name, email } });

export const addScore = (score) => ({ type: 'ADD_SCORE',
  payload: score });
