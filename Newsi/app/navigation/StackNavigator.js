import React, {Component} from 'react';
import {View, Text, ToastAndroid, ActivityIndicator} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/HomeScreen/HomeScreen';
import Login from '../screens/LoginScreen/Login';
import Details from '../screens/DetailsScreen/DetailsScreen';
import WebShow from '../screens/WebViewScreen/WebviewScreen';

import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

class StackNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      isLoding: true,
    };
  }

  componentDidMount = async () => {
    SplashScreen.hide();
    const username = await AsyncStorage.getItem('username');
    if (username != null) {
      console.log('user ' + username);
      // ToastAndroid.show(username + 'is already signed in!', ToastAndroid.SHORT);
      this.setState({loggedin: true}, () => this.setState({isLoding: false}));
    } else {
      console.log('user new');
      this.setState({loggedin: false}, () => this.setState({isLoding: false}));
    }
  };

  render() {
    if (this.state.isLoding) {
      return <ActivityIndicator></ActivityIndicator>;
    } else {
      return (
        <Stack.Navigator
          initialRouteName={this.state.loggedin == true ? 'Home' : 'Login'}
          headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="WebShow" component={WebShow} />
        </Stack.Navigator>
      );
    }
  }
}

export default StackNavigator;
