const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_PLAYER':
    return { ...state,
      name: action.payload.name,
      assertions: 0,
      score: 0,
      gravatarEmail: action.payload.email };

  default:
    return state;
  }
}
