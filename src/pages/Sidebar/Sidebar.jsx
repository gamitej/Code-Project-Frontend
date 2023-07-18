import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// store
import { useGlobal } from "../../store/global/useGlobal";
// img
import logo from "../../assests/logo-2.png";
// mui
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// CONSTANTS
const linkList = [
  { to: "/", title: "Home", icon: <HomeIcon /> },
  { to: "/profile", title: "Profile", icon: <PersonIcon /> },
];

const btnClass =
  "text-lg h-[2.5rem] hover:bg-slate-300 flex justify-center items-center rounded-md cursor-pointer duration-300 ease-in-out";

function Sidebar({ reff }) {
  const { pathname: active } = useLocation();
  const { isSideBarOpen, setIsSideBarOpen } = useGlobal();
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true);

  // ================ USE-EFFECT =================

  useEffect(() => {
    if (isSideBarOpen) {
      setSideBarCollapsed(true);
    }
  }, [isSideBarOpen]);

  /**
   * JSX
   */

  return (
    <div className="flex" ref={reff}>
      <div
        className={`top-0 left-0 fixed ${
          sideBarCollapsed ? "w-[5rem]" : "w-[10rem]"
        }  z-[1000]  h-full bg-blue-100 ease-in-out duration-300 ${
          isSideBarOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center h-[80%] mt-5">
          <div
            className="cursor-pointer"
            onClick={() => setIsSideBarOpen(false)}
          >
            <img src={logo} alt="logo" className="w-[7rem] h-[4rem]" />
          </div>
          {/* SIDEBAR CONTENT */}
          <ul className="flex flex-col justify-around items-center h-[20%]">
            {linkList.map(({ to, title, icon }, idx) => (
              <NavLink
                key={idx}
                to={to}
                className={`${btnClass} ${active === to && "bg-red-300"} ${
                  sideBarCollapsed ? "w-[4rem]" : "w-[8rem]"
                }`}
              >
                <span className={`-mt-1 ${sideBarCollapsed ? "" : "mr-3"}`}>
                  {icon}
                </span>
                {!sideBarCollapsed && <span>{title}</span>}
              </NavLink>
            ))}
          </ul>
        </div>
        {/*  COLLAPSIBLE BUTTON */}
        <div
          className="flex items-center justify-center hover:bg-slate-300 cursor-pointer"
          onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
        >
          {sideBarCollapsed ? (
            <KeyboardArrowRightIcon sx={{ fontSize: "2rem" }} />
          ) : (
            <KeyboardArrowLeftIcon sx={{ fontSize: "2rem" }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
