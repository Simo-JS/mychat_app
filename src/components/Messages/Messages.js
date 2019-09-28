import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";

import MetaPanel from "../MetaPanel/MetaPanel";
import AddMessageForm from "./AddMessageForm";
import MessagesHeader from "./MessagesHeader";
import MessagesArea from "./MessagesArea";

import firebase from "firebase";
import mime from "mime-types";

const Messages = props => {
  const currentChannel = useSelector(state => state.channels.currentChannel);
  const { uid, displayName, photoURL } = useSelector(state => state.user.user);
  const messages = useSelector(state =>
    currentChannel ? state.messages.messages[currentChannel.id] : []
  );

  const [messagesRef] = useState(firebase.database().ref("messages"));
  const [storageRef] = useState(firebase.storage().ref());
  const [uploadState, setUploadState] = useState("");
  const [uploadTask, setUploadTask] = useState(null);

  useEffect(() => {
    if (uploadTask) {
      uploadTask.on(
        "state_changed",
        snap => {
          let progress = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% done");
          switch (snap.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        () => {
          console.log("Something went wrong");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            addMessageHandler(downloadURL, true);
          });
        }
      );
    }
  }, [uploadTask]);

  const uploadFileHandler = file => {
    if (file !== null) {
      const metadata = { content: mime.lookup(file.name) };
      // const pathToUpload = currentChannel.id;
      const filePath = "chat/public/uuidv4.jpg";
      setUploadState("uploading");
      setUploadTask(storageRef.child(filePath).put(file, metadata));
    }
    console.log(file);
  };

  const addMessageHandler = (content, isFile) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        uid,
        name: displayName,
        avatar: photoURL
      }
    };
    if (isFile) message["image"] = content;
    else message["content"] = content;
    messagesRef
      .child(currentChannel.id)
      .push()
      .set(message);
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
        <AddMessageForm
          uploadFileHandler={uploadFileHandler}
          addMessageHandle={addMessageHandler}
        />
      </Grid>
    </Grid>
  );
};

export default Messages;
