import {URLS} from '../../../constants/URLFILE';
import {
  SET_DATA,
  setData,
  startLoading,
  stopLoading,
  STOP_LOADING,
  START_LOADING,
  CLEAR_DATA,
  startMainLoading,
  stopMainLoading,
  START_MAIN_LOADING,
  STOP_MAIN_LOADING,
} from '../../Actions/SearchApi/SearchApiActions';

const initialState = {
  fetchedData: [],
  loading: false,
  mainLoading: false,
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
    dispatch(stopMainLoading());
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

    case START_MAIN_LOADING:
      return {
        ...state,
        mainLoading: true,
      };
    case STOP_MAIN_LOADING:
      return {
        ...state,
        mainLoading: false,
      };

    case CLEAR_DATA:
      return {
        ...state,
        fetchedData: [],
        loading: false,
        mainLoading: false,
      };

    default:
      return state;
  }
};

export default searchReducer;
