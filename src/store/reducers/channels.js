import {
  SET_CURRENT_CHANNEL,
  SET_AVAILABLE_CHANNELS
} from "../actions/channels";

const initialState = {
  availableChannels: [],
  currentChannel: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.currentChannel
      };
    case SET_AVAILABLE_CHANNELS:
      return {
        ...state,
        availableChannels: action.availableChannels
      };
    default:
      return state;
  }
};

export default reducer;
