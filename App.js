import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import rootSaga from './app/domain/sagas';
import rootReducer from './app/domain/reducers';
import Home from './app/screens/Home';
import UserDetail from './app/screens/UserDetail';
import store from './app/domain/store';

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);

const AppNavigator = createStackNavigator(
  {
    Home,
    UserDetail,
  }, {
    initialRouteName: 'Home',
  },

);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
    );
  }
}


export default App;
