'use strict';

import AuthLoadingScreen from './src/app/loading-page'
import MainPage from './src/app/main-page'
import StartPage from './src/app/start-page';
import SignUpPage from './src/app/signup-page';
import LoginPage from './src/app/login-page';
import ProfilePage from './src/app/profile-page';
import TrainingRequestPage from './src/app/training-request-page';
import TrainingListPage from './src/app/training-list-page';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

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

export default AppContainer;