/**
 * @format
 */

import {AppRegistry, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {name as appName} from './app.json';
import StackNavigator from './app/navigation/StackNavigator';
import React from 'react';
import {persistor, store} from './app/redux/Store/Store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
        }
        persistor={persistor}>
        <NavigationContainer>
          <StackNavigator></StackNavigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
