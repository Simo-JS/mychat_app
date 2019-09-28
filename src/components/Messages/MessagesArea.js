import React from "react";
import { Paper } from "@material-ui/core";

import MessageBody from "./MessageBody";

const MessagesArea = ({ messages }) => {
  return (
    <Paper style={{ padding: 10 }}>
      {messages &&
        messages.map(message => (
          <MessageBody key={message.id} message={message} />
        ))}
    </Paper>
  );
};

export default MessagesArea;
