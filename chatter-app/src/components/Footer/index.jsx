import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";
import "./index.css";

const Footer = () => {
  const StyledFavoriteIcon = withStyles({
    root: {
      color: "#ed2939",
      fontSize: "18px",
      padding: "0px 2px",
    },
  })(FavoriteIcon);

  return (
    <div className="footer-icon">
      Built with <StyledFavoriteIcon /> by Mudassir Khan
    </div>
  );
};

export default Footer;
