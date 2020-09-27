import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  BackHandler,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Images} from '../../assets/Images';
import {URLS} from '../../constants/URLFILE';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './HomeScreenStyles';
import {LoginButton} from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {deleteuser} from '../../redux/Actions/User/UserActions';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {fetchData} from '../../redux/Reducers/SearchData/SearchReducer';
import {clearData} from '../../redux/Actions/SearchApi/SearchApiActions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      searchText: 'welcome',
      pageNumber: 1,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  onPressLogoutButton = () => {
    this.props.clearData();
    this.props.deleteUser();
    this.props.navigation.navigate('Login');
  };

  loadData = () => {
    this.setState({pageNumber: 1}, () => {
      if (this.state.searchText.length > 0) {
        this.props.fetchData(this.state.searchText, this.state.pageNumber, 1);
      }
    });
  };

  onEndReachedFlatList = () => {
    this.setState({pageNumber: this.state.pageNumber + 1}, () => {
      this.props.fetchData(this.state.searchText, this.state.pageNumber, 2);
    });
  };

  renderFooterList = () => {
    if (this.props.loading) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: hp('10%'),
            width: '100%',
          }}>
          <ActivityIndicator size="small" color="black"></ActivityIndicator>
        </View>
      );
    } else if (this.props.loading == false) {
      return null;
    }
  };

  componentDidMount = async () => {
    this.props.fetchData(this.state.searchText, '1', 1);
  };

  onItemPress = (item) => {
    this.props.navigation.navigate('Details', {item: item});
  };

  onLogout = () => {
    //Clear the state after logout
    this.props.clearData();
    this.props.deleteUser();
    this.onPressLogoutButton();
  };

  _signOut = async () => {
    //Remove user session from the device.
    this.props.clearData();
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.deleteUser();
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          {/* <LoginButton></LoginButton> */}
          <View style={[styles.sub]}>
            <View style={{flexDirection: 'row'}}>
              {this.props.profile_pic.length == 0 && (
                <Image style={styles.imageStyle} source={Images.user}></Image>
              )}

              {this.props.profile_pic.length > 0 && (
                <Image
                  style={styles.imageStyle}
                  source={{uri: this.props.profile_pic}}></Image>
              )}

              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={styles.username}>{this.props.user_name}</Text>
              </View>
            </View>
            {(this.props.logincode == 1 || this.props.logincode == 3) && (
              <TouchableOpacity
                onPress={() => {
                  if (this.props.logincode == 1) {
                    this.onPressLogoutButton();
                  } else if (this.props.logincode == 3) {
                    this._signOut();
                  }
                }}>
                <Image style={styles.imageStyle} source={Images.logout}></Image>
              </TouchableOpacity>
            )}
            {this.props.logincode == 2 && (
              <LoginButton onLogoutFinished={this.onLogout}></LoginButton>
            )}
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.TextInput}
              onChangeText={(text) => {
                this.setState({searchText: text}, () => {
                  this.loadData();
                });
              }}
              placeholder="Search here"></TextInput>
          </View>
        </View>

        <Text style={styles.simpleTxt}>
          Showing {this.props.fetchedData.length} search results for{' '}
          <Text style={{fontWeight: 'bold'}}>{this.state.searchText}</Text>
        </Text>

        {this.props.fetchedData.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            ListFooterComponent={() => this.renderFooterList()}
            onEndReachedThreshold={2}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            onEndReached={() => {
              // alert('hi');
              if (!this.onEndReachedCalledDuringMomentum) {
                this.onEndReachedFlatList(); // LOAD MORE DATA
                this.onEndReachedCalledDuringMomentum = true;
              }
            }}
            data={this.props.fetchedData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.onItemPress(item);
                }}
                style={styles.cardContainer}>
                <View>
                  <Text style={styles.titleitem}>
                    {item.title}({item.alt_title})
                  </Text>
                  <Text style={styles.simpleTxt}>
                    Publisher : {item.publisher}
                  </Text>
                  <Text style={styles.clickLink}>Click for more details</Text>
                </View>
              </TouchableOpacity>
            )}></FlatList>
        )}
        {this.props.fetchedData.length == 0 && this.props.loading == true && (
          <View style={styles.activity}>
            <ActivityIndicator size="small" color="black"></ActivityIndicator>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(
    'STATE \n \n \n \n ' + JSON.stringify(state.searchReducer.fetchedData),
  );

  return {
    user_name: state.userReducer.user_name,
    profile_pic: state.userReducer.profile_pic,
    logincode: state.userReducer.from,
    fetchedData: state.searchReducer.fetchedData,
    loading: state.searchReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: () => {
      dispatch(deleteuser());
    },
    fetchData: (searchText, pageNumber, addcode) => {
      dispatch(fetchData(searchText, pageNumber, addcode));
    },
    clearData: () => {
      dispatch(clearData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
