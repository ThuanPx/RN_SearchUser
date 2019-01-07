import types from '../../types';

export const fetching = payload => ({
  type: types.user.fetching,
  payload,
});

export const fetchingSuccess = payload => ({
  type: types.user.fetchingSuccess,
  payload,
});

export const fetchingError = payload => ({
  type: types.user.fetchingError,
  payload,
});

export default {
  fetching,
  fetchingSuccess,
  fetchingError,
};
