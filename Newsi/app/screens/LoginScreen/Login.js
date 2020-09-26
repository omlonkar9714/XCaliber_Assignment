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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

import {connect} from 'react-redux';
import {saveuser} from '../../redux/Actions/User/UserActions';

const data = {
  idToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjNmZhNmY1OTUwYTdjZTQ2NWZjZjI0N2FhMGIwOTQ4MjhhYzk1MmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxODQwNjE5ODc3NzAtaXFsc2Y0MnZrM21zdDVram1mbzI5Nmd1azh2YWUzc20uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxODQwNjE5ODc3NzAtN3A0NjlpbmVlYXBzdjBvNzl2bW1sb3VldnM1cmtrbmkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY2Nzg3MzIzODQzMTQ2NTcyMjEiLCJlbWFpbCI6Im9ta2FybG9ua2FyNzU5NzE0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiT21rYXIgTG9ua2FyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqc0xrMG1EYXdDZjFRb3g3R2trcUpMVjIzc01HS01lQ1ZVQUp5cD1zOTYtYyIsImdpdmVuX25hbWUiOiJPbWthciIsImZhbWlseV9uYW1lIjoiTG9ua2FyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MDExMjQyMDUsImV4cCI6MTYwMTEyNzgwNX0.WxdOacn6bCuTt98gritfDfNQ4DRLuKre2np2TMScsO2PQAMC8hhKAQwZt6dLG2vxgKGc1H9Odx2z-JlD0hVVonCVoEqxZXUOuFEDSKU1vJ-sY7hXBR91mF6USa5AyqEwErDTxBkzN32lyYldQ1pWW9i6fAPYxqI3Hbd7Zo48hyKHaSXKjuwhmX5d3DTDfqMecnRiTTaw69OvklSroKO_gcXi8mp1E52a8N_shG8szQrFr7aapyroG5L6R7UUh2VL2MP59_6Dr-SP4_UdUSJvNztP-oM6pEqfs5LqblU0CECMwvvC4WVltgwE5ByzsrPS5rlECFvVkNZ_ronhKEnwyQ',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/drive.readonly',
  ],
  serverAuthCode: null,
  user: {
    email: 'omkarlonkar759714@gmail.com',
    familyName: 'Lonkar',
    givenName: 'Omkar',
    id: '106678732384314657221',
    name: 'Omkar Lonkar',
    photo:
      'https://lh3.googleusercontent.com/a-/AOh14GjsLk0mDawCf1Qox7GkkqJLV23sMGKMeCVUAJyp=s96-c',
  },
};

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

  componentDidMount() {
    //initial configuration
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId:
        '184061987770-7p469ineeapsv0o79vmmlouevs5rkkni.apps.googleusercontent.com',
    });
  }

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      let data = {
        user_name: userInfo.user.name,
        profile_pic: userInfo.user.photo,
        from: 3,
      };
      this.props.saveUser(data);
      this.props.navigation.navigate('Home');
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userInfo: null}); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
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

          {this.props.user_name.length == 0 && (
            <GoogleSigninButton
              style={{width: 312, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this._signIn}
            />
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
