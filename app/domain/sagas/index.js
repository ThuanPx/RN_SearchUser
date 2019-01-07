import { all, fork } from 'redux-saga/effects';
import github from './github';
import user from './user';

export default function* rootSaga() {
  yield all([...github.map(watcher => fork(watcher))]);
  yield all([...user.map(watcher => fork(watcher))]);
}
