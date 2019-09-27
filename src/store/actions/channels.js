export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";
export const SET_AVAILABLE_CHANNELS = "SET_AVAILABLE_CHANNELS";

export const setCurrentChannel = currentChannel => {
  return {
    type: SET_CURRENT_CHANNEL,
    currentChannel
  };
};

export const setAvailableChannels = availableChannels => {
  return {
    type: SET_AVAILABLE_CHANNELS,
    availableChannels
  };
};
