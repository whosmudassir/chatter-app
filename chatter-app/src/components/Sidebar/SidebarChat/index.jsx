import {
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Box,
  Typography,
} from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import "./index.css";
import db from "../../../firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

function SidebarChat({ id, name, addNewChat }) {
  // hook for random new chat avatars
  const [seed, setSeed] = useState("");
  const [openNameModal, setOpenNameModal] = useState(false);
  const [messages, setMessages] = useState("");
  const [input, setInput] = useState("");

  //for listing last msg
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  //function for the createchat- pops up prompt
  const createChat = (e) => {
    e.preventDefault();
    console.log("you typed >>>", input);
    if (input) {
      db.collection("rooms").add({
        name: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
    setOpenNameModal(!openNameModal);
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`  https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`}
        />
        <div className="sidebarChat-info">
          <p className="sidebar-chat-name">{name}</p>
          <p className="sidebar-chat-message">{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <>
      <div onClick={createChat} className="add-group-wrapper">
        <p className="add-group-text">
          <GroupAddIcon /> Add new chat room
        </p>
      </div>
      {/* chat room modal */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openNameModal}
        onClose={() => setOpenNameModal(false)}
      >
        <DialogTitle
          className="title"
          sx={{
            m: 0,
            p: 2,
          }}
        >
          <div className="dailog-title"> Enter chat room name</div>
        </DialogTitle>
        <DialogContent
          sx={{
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            id="fullWidth"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <div className="create-btn">
            <Button onClick={createChat} color="primary">
              <p>Create</p>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SidebarChat;
