const initialState = {
  login: false,
  id: 0,
  name: '',
  pictureUrl: '',
  friends: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_STATE':
      return Object.assign({}, state, {
        login: action.payload.login,
        id: action.payload.id,
        name: action.payload.name,
        pictureUrl: action.payload.pictureUrl,
        friends: action.payload.friends,
      });
    default:
      return state;
  }
};

export default user;
