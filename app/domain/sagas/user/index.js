import { all, takeLatest } from 'redux-saga/effects';
import types from '../../types';
import getDetailUser from './detailuser';

export default [
  function* getDetailUserWatcher() {
    yield all([takeLatest(types.user.fetching, getDetailUser)]);
  },
];
