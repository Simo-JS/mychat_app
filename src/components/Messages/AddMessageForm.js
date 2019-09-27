import React, { useState } from "react";

import { Add } from "@material-ui/icons";
import {
  TextField,
  InputAdornment,
  Button,
  Paper,
  Grid
} from "@material-ui/core";

const AddMessageForm = props => {
  const [message, setMessage] = useState("");

  const addHandle = () => {
    props.addMessageHandle(message);
  };

  return (
    <Paper style={{ padding: 10 }}>
      <form>
        <TextField
          label="Message"
          type="text"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Add color="primary" />
              </InputAdornment>
            )
          }}
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
        />
        <br />
        <br />
        <Grid container>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={addHandle}>
              Add reply
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" onClick={() => {}}>
              Upload media
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddMessageForm;
