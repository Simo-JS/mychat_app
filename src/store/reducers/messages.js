import { SET_MESSAGES } from "../actions/messages";

const initialState = {
  messages: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        messages: action.messages
      };
    default:
      return state;
  }
};

export default reducer;
