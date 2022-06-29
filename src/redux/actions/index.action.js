export const addPlayer = (name, email) => ({ type: 'ADD_PLAYER',
  payload: { name, email } });

export const addCurrencies = (currencies) => ({ type: 'NEW_CURRENCIES',
  payload: currencies });
