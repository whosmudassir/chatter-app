import React, { useState, useEffect } from "react";
import "./index.css";
import { SearchOutlined } from "@material-ui/icons/";
import SidebarChat from "./SidebarChat/index";
import db from "../../firebase";
import SidebarHeader from "./SidebarHeader";

function Sidebar() {
  // connecting to db
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setRooms(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <SidebarHeader />

      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat room" type="text" />
        </div>
      </div>

      <div className="sidebar-chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
