import React from "react";
// mui
import { IconButton, Menu } from "@mui/material";
import { useGlobal } from "../../store/global/useGlobal";

const BasicMenu = ({
  children,
  arialLabel = "",
  size = "large",
  menuId = "menu-bar",
  handleClose = () => {},
  handleOpen = () => {},
  open = null,
  icon,
}) => {
  const { darkMode, setDarkMode } = useGlobal();

  return (
    <div>
      <div>
        <IconButton
          size={size}
          aria-label={arialLabel}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpen}
          color="primary"
        >
          {icon}
        </IconButton>
        <Menu
          id={menuId}
          anchorEl={open}
          keepMounted
          open={Boolean(open)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {children}
        </Menu>
      </div>
    </div>
  );
};

export default BasicMenu;

// ================= HELPER CODE ==================

//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
