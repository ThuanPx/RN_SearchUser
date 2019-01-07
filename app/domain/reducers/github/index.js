import types from '../../types';

const initialState = {
  users: null,
  isFetching: false,
  isError: false,
  isRefreshing: false,
};

const githubReducer = (state = initialState, { type, payload }) => {
  console.log('githubReducer', JSON.stringify(payload));
  switch (type) {
    case types.github.fetching:
      return {
        ...state,
        isFetching: true,
        isRefreshing: true,
      };
    case types.github.fetchingSuccess:
      console.log('users', JSON.stringify(payload.users));
      return {
        ...state,
        isFetching: false,
        users: payload.users,
        isRefreshing: false,
      };
    case types.github.fetchingError:
      return {
        ...state,
        isFetching: false,
        isError: true,
        isRefreshing: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
