import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat";

function SidebarChat() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebarChat">
      <Avatar src={"https://avatars.dicebear.com/api/bottts/${seed}.svg"} />
      <div className="sidebarChat-info">
        <h1>Room name</h1>
        <p>Last msg</p>
      </div>
    </div>
  );
}

export default SidebarChat;
