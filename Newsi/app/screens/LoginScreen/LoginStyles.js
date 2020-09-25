import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../constants/COLORS';

export const styles = StyleSheet.create({
  logo: {
    height: hp('10%'),
    width: hp('10%'),
    marginVertical: hp('2%'),
  },
  headerText: {fontSize: hp('3%'), fontWeight: 'bold'},
  loginHeaderContainer: {
    marginVertical: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  container: {
    flex: 1,
    backgroundColor: COLORS.faintGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {fontSize: hp('1.8%')},
  textInputContainer: {
    marginVertical: hp('1%'),
    borderWidth: hp('0.1%'),
    borderRadius: hp('1%'),
    paddingLeft: hp('2%'),
  },
  cardStyle: {
    width: wp('80%'),
    borderRadius: hp('2%'),
    padding: hp('2%'),
    borderColor: COLORS.black,
    borderWidth: hp('0.2%'),
  },
});
