import React from "react";
import { useLogin } from "../../store/login/useLogin";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const ProfileMenu = () => {
  const { isLoggined, setLogout } = useLogin();

  const [anchorEl, setAnchorEl] = React.useState(null);

  // =========== EVENT HANDLERS ================
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUsername = () => {
    return window.sessionStorage.getItem("user");
  };

  return (
    <div>
      {isLoggined && (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="primary"
          >
            <AccountCircle sx={{ fontSize: "2rem" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <NavLink to="/profile" onClick={() => setAnchorEl(null)}>
              <MenuItem>{getUsername()}</MenuItem>
            </NavLink>
            <MenuItem onClick={setLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
