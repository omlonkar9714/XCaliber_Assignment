import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../constants/COLORS';

export const styles = StyleSheet.create({
  username: {
    alignSelf: 'center',
    fontSize: hp('2%'),
    paddingLeft: hp('1%'),
  },
  imageStyle: {height: hp('5%'), width: hp('5%'), resizeMode: 'contain'},
  cardContainer: {
    padding: hp('2%'),
    marginVertical: hp('2%'),
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: hp('2%'),
    width: '100%',
  },
  titleitem: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginVertical: hp('0.5%'),
  },
  clickLink: {
    fontSize: hp('1.5%'),
    color: COLORS.red,
    marginVertical: hp('0.5%'),
  },
  simpleTxt: {
    fontSize: hp('1.8%'),
    marginVertical: hp('0.5%'),
  },
  activity: {justifyContent: 'center', alignItems: 'center', flex: 1},
  sub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextInput: {fontSize: hp('1.8%')},
  textInputContainer: {
    marginVertical: hp('1%'),
    borderWidth: hp('0.1%'),
    borderRadius: hp('1%'),
    paddingLeft: hp('2%'),
  },
  container: {flex: 1, padding: hp('2%')},
  loginbtnView: {
    padding: hp('1%'),
    marginTop: hp('2%'),
    borderRadius: hp('1%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loginbtnText: {color: 'white', fontSize: hp('2%')},
});
