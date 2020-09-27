import {URLS} from '../../../constants/URLFILE';
import {
  SET_DATA,
  setData,
  startLoading,
  stopLoading,
  STOP_LOADING,
  START_LOADING,
  CLEAR_DATA,
} from '../../Actions/SearchApi/SearchApiActions';

const initialState = {
  fetchedData: [],
  loading: false,
};

export const fetchData = (searchText, PageNumber, addcode) => async (
  dispatch,
  getState,
) => {
  dispatch(startLoading());
  const result = await fetch(
    URLS.baseURL + URLS.Loadpart1 + searchText + URLS.Loadpart2 + PageNumber,
  ).then((response) => response.json());
  //   alert(JSON.stringify(result.items));
  if (result.items.length > 0) {
    dispatch(setData(result.items, addcode));
    dispatch(stopLoading());
  }
};

const searchReducer = (state = initialState, action) => {
  //   console.log('Action' + JSON.stringify(action));

  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        fetchedData:
          action.addcode == 1
            ? action.data
            : state.fetchedData.concat(action.data),
      };

    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    case CLEAR_DATA:
      return {
        ...state,
        fetchedData: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default searchReducer;
