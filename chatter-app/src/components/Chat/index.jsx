import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import db from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../StateProvider";
import logo from "../../assets/images/logo.png";

function Chat() {
  //for room clicks
  const { roomId } = useParams();
  //keep track of the room name
  const [roomName, setRoomName] = useState("");
  //input field tracing - to pushe the messages in db
  const [input, setInput] = useState("");
  //to keep track of messages
  const [messages, setMessages] = useState([]);

  const [{ user }, dispatch] = useStateValue();

  //use effect for the name change when id changes
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  // reaction after we click send message button
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>>", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <>
      {!roomId ? (
        <div className="empty-chat">
          <img className="empty-chat-img" src={logo} />
          <p className="empty-chat-text empty-chat-header">
            Welcome to Chatter
          </p>
          <p className="empty-chat-text">
            Select/Create a chat room to start chatting
          </p>
        </div>
      ) : (
        <div className="chat">
          <div className="chat-header">
            <div className="chat-headerInfo">
              <h3>{roomName}</h3>
              <p>
                last seen{" "}
                {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
              </p>
            </div>

            <div className="chat-headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((message) => (
              <p
                className={`chat-message ${
                  message.name === user.displayName && "chat-receiver"
                }`}
              >
                <span className="chat-name">{message.name}</span>
                {message.message}
                <span className="chat-timestamp">
                  {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
            ))}
          </div>

          <div className="chat-footer">
            <InsertEmoticonIcon />
            <form>
              {" "}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                type="text"
              />
              <button onClick={sendMessage} type="submit">
                Send a message
              </button>
            </form>
            <MicIcon />
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
