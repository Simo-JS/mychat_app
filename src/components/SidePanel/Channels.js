import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
  List
} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import AddIcon from "@material-ui/icons/Add";

import firebase from "../../firebase";
import * as channelsActions from "../../store/actions/channels";

const Channels = props => {
  const user = useSelector(state => state.user.user);
  const availableChannels = useSelector(
    state => state.channels.availableChannels
  );
  const currentChannel = useSelector(state => state.channels.currentChannel);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [open, setOpen] = useState(false);
  const [channelsRef] = useState(firebase.database().ref("channels"));
  const [firstLoad, setFirstLoad] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (firstLoad && availableChannels.length > 0) {
      dispatch(channelsActions.setCurrentChannel(availableChannels[0]));
      setFirstLoad(false);
    }
  }, [dispatch, availableChannels, firstLoad]);

  const addHandle = () => {
    const { displayName, photoURL } = user;
    const key = channelsRef.push().key;
    channelsRef.child(key).set({
      id: key,
      name,
      details,
      createdBy: {
        name: displayName,
        avatar: photoURL
      }
    });
    setOpen(false);
  };

  return (
    <Fragment>
      <ListItem>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText>Channels (5)</ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {currentChannel && availableChannels && availableChannels.length > 0 && (
        <List>
          {availableChannels.map((channel, i) => (
            <ListItem
              button
              key={i}
              selected={channel.id === currentChannel.id}
              onClick={() => {
                dispatch(channelsActions.setCurrentChannel(channel));
              }}
            >
              <ListItemText>{channel.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Add new channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the bellow form to add a new channel. Thank you.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="Details"
            type="text"
            fullWidth
            value={details}
            onChange={e => {
              setDetails(e.target.value);
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
          <Button variant="contained" onClick={addHandle} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Channels;
