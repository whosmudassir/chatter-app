import {
  Avatar,
  IconButton,
  Button,
  Modal,
  Box,
  Typography,
} from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
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
  const createChat = () => {
    // const roomName = prompt("Please enter name for the new chat room");
    // if (roomName) {
    //   db.collection("rooms").add({
    //     name: roomName,
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   });
    // }

    setOpenNameModal(!openNameModal);
  };

  //condition - if not addNewChat then render sidebarChat otherwise render createChat
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
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
      <Modal open={openNameModal} onClose={() => setOpenNameModal(false)}>
        <div>
          {" "}
          <Typography>Please enter name for the new chat room</Typography>
        </div>
      </Modal>
    </>
  );
}

export default SidebarChat;
