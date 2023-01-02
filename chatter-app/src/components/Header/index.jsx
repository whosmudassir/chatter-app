import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import { withStyles } from "@material-ui/core/styles";
import "./index.css";

const Header = () => {
  const StyledGitHubIcon = withStyles({
    root: {
      fontSize: "26px",
    },
  })(GitHubIcon);

  return (
    <div className="header-icon">
      <button
        onClick={() => {
          window.open("https://github.com/whosmudassir/chatter-app", "_blank");
        }}
        className="header-btn"
      >
        <StyledGitHubIcon />
      </button>
    </div>
  );
};

export default Header;
