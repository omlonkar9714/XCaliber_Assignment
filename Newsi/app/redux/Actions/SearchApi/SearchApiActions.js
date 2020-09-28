export const SET_DATA = 'SET_DATA';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const START_MAIN_LOADING = 'START_MAIN_LOADING';
export const STOP_MAIN_LOADING = 'STOP_MAIN_LOADING';
export const CLEAR_DATA = 'CLEAR_DATA';

export const setData = (data, addcode) => {
  return {
    type: SET_DATA,
    data,
    addcode,
  };
};

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};
export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const startMainLoading = () => {
  return {
    type: START_MAIN_LOADING,
  };
};
export const stopMainLoading = () => {
  return {
    type: STOP_MAIN_LOADING,
  };
};

export const clearData = () => {
  return {
    type: CLEAR_DATA,
  };
};
