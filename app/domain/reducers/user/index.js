import types from '../../types';

const initState = {
  user: null,
  isFetching: false,
  isError: false,
};

const userReducer = (state = initState, { type, payload }) => {
  console.log('user reducer', JSON.stringify(payload));
  switch (type) {
    case types.user.fetching:
      return {
        ...state, isFetching: true,
      };
    case types.user.fetchingSuccess:
      return {
        ...state, isFetching: false, user: payload.user,
      };
    case types.user.fetchingError:
      return {
        ...state, isFetching: false, isError: true,
      };
    default:
      return state;
  }
};

export default userReducer;
