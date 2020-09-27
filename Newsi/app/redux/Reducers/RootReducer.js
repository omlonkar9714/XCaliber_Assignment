import {combineReducers} from 'redux';
import userReducer from './User/UserReducer';
import searchReducer from './SearchData/SearchReducer';
export default combineReducers({
  userReducer: userReducer,
  searchReducer: searchReducer,
});
