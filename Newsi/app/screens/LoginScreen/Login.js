import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './LoginStyles';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../../assets/Images';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {saveuser} from '../../redux/Actions/User/UserActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      user_name: '',
      token: '',
      profile_pic: '',
    };
  }

  onPressLoginButton = async () => {
    if (this.state.username != '' && this.state.password != '') {
      let data = {user_name: this.state.user_name, profile_pic: '', from: 1};
      this.props.saveUser(data);
      this.props.navigation.navigate('Home');
    } else {
      this.verifyInput();
    }
  };

  verifyInput = () => {
    let {username, password} = this.state;
    if (username == '') {
      ToastAndroid.show('Please enter username', ToastAndroid.SHORT);
    } else if (password == '') {
      ToastAndroid.show('Please enter password', ToastAndroid.SHORT);
    }
  };

  onLogout = () => {
    //Clear the state after logout
    this.setState({user_name: null, token: null, profile_pic: null});
  };

  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      // alert(JSON.stringify(result));
      console.log(JSON.stringify(result));
      // this.setState({user_name: 'Welcome' + ' ' + result.name});
      // this.setState({token: 'User Token: ' + ' ' + result.id});
      // this.setState({profile_pic: result.picture.data.url});

      let data = {
        user_name: result.name,
        profile_pic: result.picture.data.url,
        from: 2,
      };
      this.props.saveUser(data);
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Images.logo}></Image>

        {this.state.profile_pic ? (
          <Image source={{uri: this.state.profile_pic}} style={styles.logo} />
        ) : null}

        <View style={styles.cardStyle}>
          <View style={styles.loginHeaderContainer}>
            <Text style={styles.headerText}>Login</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.TextInput}
              onChangeText={(text) => {
                this.setState({user_name: text});
              }}
              placeholder="Enter username"></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              secureTextEntry={true}
              style={styles.TextInput}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
              placeholder="Enter password"></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.onPressLoginButton();
            }}>
            <View style={styles.loginbtnView}>
              <Text style={styles.loginbtnText}>Login</Text>
            </View>
          </TouchableOpacity>
          {this.props.user_name.length == 0 && (
            <LoginButton
              style={styles.fblogin}
              readPermissions={['public_profile']}
              onLogoutFinished={this.onLogout}
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log(error);
                  console.log('login has error: ' + result.error);
                  ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
                } else if (result.isCancelled) {
                  // alert('login is cancelled.');
                  ToastAndroid.show('Login is cancelled.', ToastAndroid.SHORT);
                } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                    // alert(data.accessToken.toString());
                    console.log(data.accessToken.toString());
                    const processRequest = new GraphRequest(
                      '/me?fields=name,picture.type(large)',
                      null,
                      this.get_Response_Info,
                    );
                    // Start the graph request.
                    new GraphRequestManager()
                      .addRequest(processRequest)
                      .start();
                  });
                }
              }}></LoginButton>
          )}
        </View>
      </View>
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
    saveUser: (data) => {
      dispatch(saveuser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
