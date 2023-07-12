import React from "react";
import { NavLink } from "react-router-dom";
// store
import { useLogin } from "../../store/login/useLogin";
// mui
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useGlobal } from "../../store/global/useGlobal";

const ProfileMenu = () => {
  const { darkMode, setDarkMode } = useGlobal();
  const { isLoggined, setLogout } = useLogin();

  const [anchorEl, setAnchorEl] = React.useState(null);

  // =========== EVENT HANDLERS ================
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLogout();
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
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
            <Avatar src="" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <NavLink to="/profile" onClick={() => setAnchorEl(null)}>
              <MenuItem>Profile</MenuItem>
            </NavLink>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
