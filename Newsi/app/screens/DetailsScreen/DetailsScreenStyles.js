import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../constants/COLORS';

export const styles = StyleSheet.create({
  textCommon: {
    fontSize: hp('1.8%'),
    marginVertical: hp('0.5%'),
  },
  TitleMain: {
    fontSize: hp('3%'),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: hp('0.5%'),
  },
  fieldContainer: {
    padding: hp('2%'),
    marginVertical: hp('2%'),
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: hp('2%'),
    width: '100%',
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  sub: {flex: 1, margin: hp('2%')},
});
