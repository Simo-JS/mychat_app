import { SET_USER, UNSET_USER } from "../actions/user";

const initialState = {
  user: null,
  isLoading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.user,
        isLoading: false
      };
    case UNSET_USER:
      return {
        ...initialState,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
