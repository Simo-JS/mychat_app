import React from "react";
import ColorPanel from "./components/ColorPanel/ColorPanel";

import Grid from "@material-ui/core/Grid";
import SidePanel from "./components/SidePanel/SidePanel";
import Messages from "./components/Messages/Messages";
import MetaPanel from "./components/MetaPanel/MetaPanel";

const App = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <SidePanel />
      </Grid>
      <Grid item xs={3}>
        <ColorPanel />
      </Grid>
      <Grid item xs={3}>
        <Messages />
      </Grid>
      <Grid item xs={3}>
        <MetaPanel />
      </Grid>
    </Grid>
  );
};

export default App;
