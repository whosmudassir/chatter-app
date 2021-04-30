import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

function SidebarChat({ addNewChat }) {
  // hook for random new chat avatars
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  //function for the createchat- pops up prompt
  const createChat = () => {
    const roomName = prompt("Please enter name for the new chat room");
    // if(roomName){do some stuff}
  };

  //condition - if not addNewChat then render sidebarChat otherwise render createChat
  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
      <div className="sidebarChat-info">
        <h2>Room name</h2>
        <p>Last msg</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      {" "}
      <h2>Add new chat room</h2>
    </div>
  );
}

export default SidebarChat;
