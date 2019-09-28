import React from "react";

import moment from "moment";

import PersonIcon from "@material-ui/icons/Person";
import { Avatar, Grid } from "@material-ui/core";

const MessageBody = ({ message }) => {
  return (
    <Grid container spacing={1} style={{ padding: 5 }}>
      <Grid item>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </Grid>
      <Grid item>
        <Grid container spacing={1} direction="column">
          <Grid item>
            {message.user.name + " " + moment(message.timestamp).fromNow()}
          </Grid>
          {message.image ? (
            <Grid item>
              <img src={message.image} />
            </Grid>
          ) : (
            <Grid item>{message.content}</Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessageBody;
