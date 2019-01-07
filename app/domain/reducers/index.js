import { combineReducers } from 'redux';
import githubReducer from './github';
import userReducer from './user';

const rootReducers = combineReducers({
  github: githubReducer,
  user: userReducer,
});

export default rootReducers;
