import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import db from "../../firebase";
import firebase from "firebase";
import { useStateValue } from "../../StateProvider";
import logo from "../../assets/images/logo.png";
import { useHistory } from "react-router-dom";

function Chat() {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const history = useHistory();

  const handleClick = () => {
    history.push("/rooms");
  };

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
        <div className="empty-chat hide-empty-chat">
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
            <div className="chat-back-btn">
              <IconButton onClick={handleClick}>
                <ArrowBackIcon />
              </IconButton>
            </div>

            <div className="chat-room-title">
              <h3 className="chat-room-name">{roomName}</h3>
            </div>

            <div></div>
          </div>

          <div className="chat-body">
            {messages.map((message) => (
              <p
                className={` ${
                  message.name === user.displayName
                    ? "chat-receiver"
                    : "chat-message"
                }`}
              >
                <span
                  className={`${
                    message.name === user.displayName
                      ? "chat-receiver-name"
                      : "chat-name"
                  }`}
                >
                  {message.name}
                </span>
                <p className="chat-text">{message.message}</p>
                <span className="chat-timestamp">
                  {new Date(message.timestamp?.toDate()).toLocaleString(
                    "en-IN",
                    { timeZone: "Asia/Kolkata" }
                  )}
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
