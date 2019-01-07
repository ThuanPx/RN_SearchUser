import { takeLatest, all } from 'redux-saga/effects';
import searchUser from './searchUser';
import types from '../../types';

export default [
  function* searchUserWatcher() {
    yield all([takeLatest(types.github.fetching, searchUser)]);
  },
];
