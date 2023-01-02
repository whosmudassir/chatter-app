import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./index.css";

const Header = () => {
  return (
    <div className="header-icon">
      <button
        onClick={() => {
          window.open("https://github.com/whosmudassir/chatter-app", "_blank");
        }}
        className="header-btn"
      >
        <GitHubIcon />
      </button>
    </div>
  );
};

export default Header;
