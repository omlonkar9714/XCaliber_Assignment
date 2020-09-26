import {combineReducers} from 'redux';
import userReducer from './User/UserReducer';
export default combineReducers({userReducer: userReducer});
