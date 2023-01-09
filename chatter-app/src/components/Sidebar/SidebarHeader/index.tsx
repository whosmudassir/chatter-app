import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import "./index.css";
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

      <div className="header-logo-wrapper">
        <ModeCommentIcon className="header-logo" />{" "}
        <p className="header-text">Chatter</p>
      </div>

      <div className="sidebar-headerRight">
        <IconButton onClick={logout}>
          <ExitToAppIcon className="signout-btn " />
        </IconButton>
      </div>
    </div>
  );
};

export default SidebarHeader;
