import {SAVE_USER, DELETE_USER} from '../../Actions/User/UserActions';

const initialState = {
  user_name: '',
  profile_pic: '',
  from: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user_name: action.data.user_name,
        profile_pic: action.data.profile_pic,
        from: action.data.from,
      };

    case DELETE_USER:
      return {
        ...state,
        user_name: '',
        profile_pic: '',
        from: 0,
      };

    default:
      return state;
  }
};

export default userReducer;
