import React from "react";
import ColorPanel from "./components/ColorPanel/ColorPanel";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SidePanel from "./components/SidePanel/SidePanel";

import Messages from "./components/Messages/Messages";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  }
});

const App = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <ColorPanel />
        </Grid>
        <Grid item xs={2}>
          <SidePanel />
        </Grid>
        <Grid item xs={9}>
          <Messages />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
