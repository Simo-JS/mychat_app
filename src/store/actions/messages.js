export const SET_MESSAGES = "SET_MESSAGES";

export const setMessages = messages => {
  return {
    type: SET_MESSAGES,
    messages
  };
};
