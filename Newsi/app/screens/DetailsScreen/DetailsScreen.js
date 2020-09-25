import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './DetailsScreenStyles';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {isLoading: true, item: {}};
  }

  componentDidMount() {
    let item = this.props.route.params.item;
    console.log('item \n' + JSON.stringify(item));
    this.setState({item}, () => {
      this.setState({isLoading: false});
    });
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
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    const {item} = this.state;
    return (
      <View style={styles.sub}>
        <ScrollView>
          {this.state.isLoading && (
            <View style={styles.container}>
              <ActivityIndicator></ActivityIndicator>
            </View>
          )}
          {this.state.isLoading == false && (
            <View>
              <Text style={styles.TitleMain}>Details</Text>
              <View style={styles.fieldContainer}>
                <View>
                  <Text style={styles.textCommon}>
                    {item.title}({item.alt_title})
                  </Text>
                  <Text style={styles.textCommon}>
                    Place of publication : {item.place_of_publication}
                  </Text>
                  <Text style={styles.textCommon}>
                    Publisher : {item.publisher}
                  </Text>
                  <Text style={styles.textCommon}>Date : {item.date}</Text>
                  <Text style={styles.textCommon}>
                    Frequency : {item.frequency}
                  </Text>
                  <Text style={styles.textCommon}>Date : {item.date}</Text>
                  <Text style={styles.textCommon}>
                    Subject : {'\n'}
                    {item.subject.join(' ')}
                  </Text>
                  <Text style={styles.textCommon}>
                    Start Year : {item.start_year}
                  </Text>
                  <Text style={styles.textCommon}>
                    End Year : {item.end_year}
                  </Text>
                  <Text style={styles.textCommon}>
                    Note : {item.note.join(' ')}
                  </Text>

                  <Text style={styles.textCommon}>
                    ocr_eng : {item.ocr_eng}
                  </Text>

                  <Text style={styles.textCommon}>
                    Place :{item.place},{item.country}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default DetailsScreen;
