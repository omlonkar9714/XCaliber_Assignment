export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';

export const saveuser = (data) => {
  return {
    type: SAVE_USER,
    data,
  };
};

export const deleteuser = () => {
  return {
    type: DELETE_USER,
  };
};
