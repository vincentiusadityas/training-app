'use strict';

import React from 'react';
import AuthLoadingScreen from './loading/loading-page-screen'
import MainPage from './main/main-page-screen'
import StartPage from './start/start-page-screen';
import SignUpPage from './signup/signup-page';
import LoginPage from './login/login-page-screen';
import ProfilePage from './profile/profile-page-screen';
import TrainingRequestPage from './training-request/training-request-page';
import TrainingListPage from './training-list/training-list-page';

import authenticationReducer from '../modules/login/store/authentication-reducer'
import generalActionReducer from '../common/store/reducer/general-action-reducer'
import userReducer from '../modules/main/store/main-page-reducer'
import profileReducer from '../modules/profile/store/profile-page-reducer'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux';

const AppStack = createStackNavigator({ 
  Main: { screen: MainPage },
  Profile: { screen: ProfilePage },
  TrainingRequest: { screen: TrainingRequestPage },
  TrainingList: { screen: TrainingListPage },
}); 

const AuthStack = createStackNavigator({
  Start: { screen: StartPage },
  Login: { screen: LoginPage },
  Registration: { screen: SignUpPage },
})

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

const appReducers = combineReducers({
  loginReducer: authenticationReducer,
  generalReducer: generalActionReducer,
  userReducer: userReducer,
  profileReducer: profileReducer,
})

const store = createStore(appReducers, applyMiddleware(thunk))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}