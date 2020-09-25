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

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      username: '',
      searchText: '',
      loadingForEmpty: false,
      isLoading: false,
      loadingFooter: false,
      pageNumber: 1,
      data: [],
      items: [
        {
          essay: [],
          place_of_publication: 'Newark, Ohio',
          start_year: 1892,
          publisher: 'Advocate Print. Co.',
          county: ['Licking'],
          edition: null,
          frequency: 'Daily',
          url: 'https://chroniclingamerica.loc.gov/lccn/sn88078778.json',
          id: '/lccn/sn88078778/',
          subject: [
            'Licking County (Ohio)--Newspapers.',
            'Newark (Ohio)--Newspapers.',
            'Ohio--Licking County.--fast--(OCoLC)fst01207827',
            'Ohio--Newark.--fast--(OCoLC)fst01207972',
          ],
          city: ['Newark'],
          language: ['English'],
          title: 'The Daily advocate.',
          holding_type: ['Microfilm Master', 'Microfilm Service Copy'],
          end_year: 1894,
          alt_title: ['Sunday advocate'],
          note: [
            'Description based on: Vol. 33, no. 39 (Nov. 19, 1892).',
            'On Sundays published as: Sunday advocate, Sept. 3, 1893-Jan. 22, 1894.',
          ],
          lccn: 'sn88078778',
          state: ['Ohio'],
          place: ['Ohio--Licking--Newark'],
          country: 'Ohio',
          type: 'title',
          title_normal: 'daily advocate.',
          oclc: '18390979',
        },
      ],
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

  getInitialData = async () => {
    this.setState({isLoading: true, loadingForEmpty: true});
    console.log(
      'URL \n' +
        URLS.baseURL +
        URLS.Loadpart1 +
        this.state.searchText +
        URLS.Loadpart2 +
        this.state.pageNumber,
    );
    let response = await fetch(
      URLS.baseURL +
        URLS.Loadpart1 +
        this.state.searchText +
        URLS.Loadpart2 +
        this.state.pageNumber,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // body: datainfo,
      },
    );
    let result = await response.json();
    console.log('RES \n' + JSON.stringify(result.items.length));
    this.setState({data: this.state.data.concat(result.items)}, () =>
      this.setState({isLoading: false, loadingForEmpty: false}),
    );
  };

  onPressLogoutButton = () => {
    AsyncStorage.removeItem('username');
    this.props.navigation.navigate('Login');
  };

  loadData = () => {
    this.setState({data: [], pageNumber: 1}, () => {
      if (this.state.searchText.length > 0) {
        this.getInitialData();
      }
    });
  };

  onEndReachedFlatList = () => {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState({pageNumber: this.state.pageNumber + 1}, () => {
        this.getInitialData();
      });
    }, 3000);
  };

  renderFooterList = () => {
    if (this.state.isLoading) {
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
    } else if (this.state.isLoading == false) {
      return null;
    }
  };

  componentDidMount = async () => {
    const username = await AsyncStorage.getItem('username');
    if (username) {
      this.setState({username});
    }
    this.getInitialData();
  };

  onItemPress = (item) => {
    this.props.navigation.navigate('Details', {item: item});
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={[styles.sub]}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.imageStyle} source={Images.user}></Image>
              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={styles.username}>{this.state.username}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.onPressLogoutButton();
              }}>
              <Image style={styles.imageStyle} source={Images.logout}></Image>
            </TouchableOpacity>
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

        {this.state.searchText != '' && (
          <Text style={styles.simpleTxt}>
            Showing {this.state.data.length} search results for{' '}
            <Text style={{fontWeight: 'bold'}}>{this.state.searchText}</Text>
          </Text>
        )}

        {this.state.data.length > 0 && (
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
            data={this.state.data}
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
        {this.state.data.length == 0 && this.state.loadingForEmpty == true && (
          <View style={styles.activity}>
            <ActivityIndicator size="small" color="black"></ActivityIndicator>
          </View>
        )}
      </View>
    );
  }
}

export default HomeScreen;