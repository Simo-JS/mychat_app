import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

const Spinner = props => {
  return (
    <Grid
      container
      style={{ minHeight: "100vh" }}
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={4}>
        <CircularProgress color="primary" size="50%" />
      </Grid>
    </Grid>
  );
};

export default Spinner;
