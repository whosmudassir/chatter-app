import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "./firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

function SidebarChat({ id, name, addNewChat }) {
  // hook for random new chat avatars
  const [seed, setSeed] = useState("");

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
    const roomName = prompt("Please enter name for the new chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  //condition - if not addNewChat then render sidebarChat otherwise render createChat
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
        <div className="sidebarChat-info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>+ Add new chat room</h2>
    </div>
  );
}

export default SidebarChat;
