/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {name as appName} from './app.json';
import StackNavigator from './app/navigation/StackNavigator';
import React from 'react';
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator></StackNavigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);
