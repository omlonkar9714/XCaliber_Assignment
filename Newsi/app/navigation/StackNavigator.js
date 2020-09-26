import React, {Component} from 'react';
import {View, Text, ToastAndroid, ActivityIndicator} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/HomeScreen/HomeScreen';
import Login from '../screens/LoginScreen/Login';
import Details from '../screens/DetailsScreen/DetailsScreen';
import WebShow from '../screens/WebViewScreen/WebviewScreen';

import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

class StackNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    SplashScreen.hide();
  };

  render() {
    return (
      <Stack.Navigator
        initialRouteName={this.props.user_name.length > 0 ? 'Home' : 'Login'}
        headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="WebShow" component={WebShow} />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(JSON.stringify(state));
  return {
    user_name: state.userReducer.user_name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getData: () => {
    //   dispatch(getData());
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StackNavigator);
