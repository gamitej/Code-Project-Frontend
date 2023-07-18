import React, { useState } from "react";
import { useGlobal } from "../../store/global/useGlobal";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assests/logo-2.png";

function Sidebar({ reff }) {
  const { isSideBarOpen, setIsSideBarOpen } = useGlobal();
  const { pathname: active } = useLocation();

  const btnClass =
    "w-[8rem] h-[2.5rem] hover:bg-slate-300 flex justify-center items-center rounded-md cursor-pointer duration-300 ease-in-out";

  const linkList = [
    { to: "/", title: "Home" },
    { to: "/profile", title: "Profile" },
  ];

  return (
    <div className="flex" ref={reff}>
      <div
        className={`top-0 left-0 fixed w-[10rem] z-[1000]  h-full bg-blue-100 ease-in-out duration-300 ${
          isSideBarOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-y-[10vh] mt-5">
          {/* <CloseIcon
            className="cursor-pointer"
            sx={{ fontSize: "2.5rem" }}
            onClick={() => setIsSideBarOpen(false)}
          /> */}
          <div
            className="cursor-pointer -ml-5"
            onClick={() => setIsSideBarOpen(false)}
          >
            <img src={logo} alt="logo" className="w-[7rem] h-[4rem]" />
          </div>
          {/* Sidebar content */}
          <ul className="flex flex-col justify-around items-center h-[20vh]">
            {linkList.map(({ to, title }, idx) => (
              <NavLink
                key={idx}
                to={to}
                className={`${btnClass} ${active === to && "bg-red-300"}`}
              >
                {title}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
