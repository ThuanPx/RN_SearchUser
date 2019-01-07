import {
  put, call,
} from 'redux-saga/effects';
import { create } from 'apisauce';
import { fetchingSuccess } from '../../../actions/user';

const api = create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/json',
  },
});

function* getDetail(userName) {
  try {
    const request = yield yield call(api.get, `/search/users?q=${userName}`);
    if (request && request.status === 200) {
      const data = request.data.items;
      const user = objectToItem(data[0]);
      return user;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

function objectToItem(item) {
  return {
    login: item.login,
    id: item.id,
    avatarUrl: item.avatar_url,
    score: item.score,
  };
}

export default function* getDetailUser(action) {
  console.log('action user', action);
  const userName = action.payload;
  try {
    const user = yield call(getDetail, userName);
    yield put(fetchingSuccess({ user }));
  } catch (error) {
    console.log(error);
  }
}
