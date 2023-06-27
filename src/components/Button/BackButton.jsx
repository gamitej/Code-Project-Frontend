import React from "react";
import { NavLink } from "react-router-dom";
// mui
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const BackButton = ({
  to = "/",
  title = "Back",
  className = "",
  fontSize = "1rem",
  color = "whitesmoke",
  textTransform = "lowercase",
}) => {
  return (
    <NavLink to={to} className={`${className} hover:scale-105 cursor-pointer`}>
      <Button
        sx={{
          color,
          fontSize,
          textTransform,
        }}
        startIcon={
          <KeyboardBackspaceIcon
            sx={{
              color,
              width: "1.5rem",
              height: "1.5rem",
            }}
          />
        }
      >
        {title}
      </Button>
    </NavLink>
  );
};

export default BackButton;
