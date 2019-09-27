import React from "react";

import StarBorderIcon from "@material-ui/icons/StarBorder";

import { Paper, Typography } from "@material-ui/core";

const MessagesHeader = props => {
  return (
    <Paper style={{ padding: 10 }}>
      <Typography variant="h3">Channel</Typography>
      <StarBorderIcon color="primary" />
      <Typography variant="subtitle1">2 Users</Typography>
    </Paper>
  );
};

export default MessagesHeader;
