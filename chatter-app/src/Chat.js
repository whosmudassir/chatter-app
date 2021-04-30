import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Chat.css";

function Chat() {
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
        <p className="chat-message">
          <span className="chat-name">Mudassir</span>
          Hello
          <span className="chat-timestamp">4:00</span>
        </p>
      </div>

      {/* #3 */}
      <div className="chat-footer"></div>
    </div>
  );
}

export default Chat;
