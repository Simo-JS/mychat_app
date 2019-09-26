export const SET_USER = "SET_USER";
export const UNSET_USER = "UNSET_USER";

export const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

export const unsetUser = () => {
  return {
    type: UNSET_USER
  };
};
