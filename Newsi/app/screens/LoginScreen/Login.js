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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onPressLoginButton = async () => {
    if (this.state.username != '' && this.state.password != '') {
      await AsyncStorage.setItem('username', this.state.username);
      const username = await AsyncStorage.getItem('username');
      if (username) {
        this.props.navigation.navigate('Home');
      } else {
        this.verifyInput();
      }
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

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Images.logo}></Image>

        <View style={styles.cardStyle}>
          <View style={styles.loginHeaderContainer}>
            <Text style={styles.headerText}>Login</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.TextInput}
              onChangeText={(text) => {
                this.setState({username: text});
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
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   headerText: {fontSize: hp('3%'), fontWeight: 'bold'},
//   loginHeaderContainer: {
//     marginVertical: hp('1%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loginbtnView: {
//     padding: hp('1%'),
//     marginTop: hp('2%'),
//     borderRadius: hp('1%'),
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   loginbtnText: {color: 'white', fontSize: hp('2%')},
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.faintGrey,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   TextInput: {fontSize: hp('1.8%')},
//   textInputContainer: {
//     marginVertical: hp('1%'),
//     borderWidth: hp('0.1%'),
//     borderRadius: hp('1%'),
//     paddingLeft: hp('2%'),
//   },
//   cardStyle: {
//     width: wp('80%'),
//     borderRadius: hp('2%'),
//     padding: hp('2%'),
//     borderColor: COLORS.black,
//     borderWidth: hp('0.2%'),
//   },
// });

export default Login;
