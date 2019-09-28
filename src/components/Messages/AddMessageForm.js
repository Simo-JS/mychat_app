import React, { useState, Fragment } from "react";

import { Add } from "@material-ui/icons";
import {
  TextField,
  InputAdornment,
  Button,
  Paper,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

const AddMessageForm = props => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const addHandle = () => {
    props.addMessageHandle(message);
  };

  const uploadHandle = () => {
    props.uploadFileHandler(file);
    setOpen(false);
    setFile(null);
  };

  return (
    <Fragment>
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Upload media
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Upload an image</DialogTitle>
        <DialogContent>
          <DialogContentText>Select your image file</DialogContentText>
          <input
            accept="image/*"
            multiple
            type="file"
            onChange={e => {
              setFile(e.target.files[0]);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={uploadHandle} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddMessageForm;
