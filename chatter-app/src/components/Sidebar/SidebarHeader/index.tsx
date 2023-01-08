import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./index.css";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../stateManagement/reducer";

const SidebarHeader = () => {
  const [{ user }, dispatch] = useStateValue();

  const logout = () => {
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
  };

  return (
    <div className="sidebar-header">
      <Avatar src={user?.photoURL} />

      <p className="header-text">Chatter App</p>

      <div className="sidebar-headerRight">
        <button className="signout-btn" onClick={logout}>
          <ExitToAppIcon />
          &nbsp;Sign out
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
