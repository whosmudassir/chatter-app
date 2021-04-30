import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import React, { useState } from "react";
import "./Chat.css";

function Chat() {
  //input field tracing - to pushe the messages in db
  const [input, setInput] = useState("");

  // reaction after we click send message button
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>>", input);
    setInput("");
  };

  return (
    <div className="chat">
      {/* 3 main - header, body, footer */}

      {/* #1 */}
      <div className="chat-header">
        <div className="chat-headerInfo">
          <h3>Room name</h3>
          <p>last seen</p>
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

      {/* #2 */}
      <div className="chat-body">
        {/* logic for signed user chat color */}
        <p className={`chat-message ${true && `chat-receiver`}`}>
          <span className="chat-name">Mudassir</span>
          Hello
          <span className="chat-timestamp">4:00</span>
        </p>
      </div>

      {/* #3 */}
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
  );
}

export default Chat;
