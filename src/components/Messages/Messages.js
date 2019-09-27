import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";

import MetaPanel from "../MetaPanel/MetaPanel";
import AddMessageForm from "./AddMessageForm";
import MessagesHeader from "./MessagesHeader";
import MessagesArea from "./MessagesArea";

import firebase from "firebase";

const Messages = props => {
  const { uid, displayName, photoURL } = useSelector(state => state.user.user);
  const [messagesRef] = useState(firebase.database().ref("messages"));
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messagesRef.on("child_added", snap => {
      setMessages(state => state.push(snap.val()));
      console.log(messages);
    });
  }, [messagesRef]);

  const currentChannel = useSelector(state => state.channels.currentChannel);
  const addMessageHandler = content => {
    messagesRef
      .child(currentChannel.id)
      .push()
      .set({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        content,
        user: {
          uid,
          name: displayName,
          avatar: photoURL
        }
      });
  };

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={7} style={{ height: "75vh" }}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <MessagesHeader />
              </Grid>
              <Grid item xs={12}>
                <MessagesArea messages={messages} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <MetaPanel />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <AddMessageForm addMessageHandle={addMessageHandler} />
      </Grid>
    </Grid>
  );
};

export default Messages;
