import types from '../../types';

export const fetching = payload => ({
  type: types.github.fetching,
  payload,
});

export const fetchingSuccess = payload => ({
  type: types.github.fetchingSuccess,
  payload,
});

export const fetchingError = payload => ({
  type: types.github.fetchingError,
  payload,
});

export default {
  fetching,
  fetchingSuccess,
  fetchingError,
};
