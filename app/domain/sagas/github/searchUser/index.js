import {
  put, call,
} from 'redux-saga/effects';
import { create } from 'apisauce';
import { fetchingSuccess } from '../../../actions/github';

const api = create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/json',
  },
});

function* search(textSearch) {
  try {
    const request = yield yield call(
      api.get, `/search/users?q=${textSearch}`,
    );
    if (request && request.status === 200) {
      const data = request.data.items;
      const users = data.map(it => objectToItem(it));
      return users;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

function objectToItem(it) {
  return {
    login: it.login,
    id: it.id,
    avatarUrl: it.avatar_url,
  };
}

export default function* searchUser(action) {
  console.log('action github', action);
  const text = action.payload;
  try {
    const users = yield call(search, text);
    yield put(fetchingSuccess({ users }));
  } catch (e) {
    console.log(e);
  }
}
