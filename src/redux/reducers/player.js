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
  case 'ADD_SCORE':
    return { ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };

  default:
    return state;
  }
}
