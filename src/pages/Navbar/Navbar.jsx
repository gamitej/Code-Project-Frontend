import React, { useEffect, useState } from "react";
// img
import logo from "../../assests/logo-2.png";
// comp
import Notification from "./Notification";
import { ProfileMenu } from "../../components";
import LoginModal from "../../pages/Login/LoginModal";
// store
import { useLogin } from "../../store/login/useLogin";
import { useGlobal } from "../../store/global/useGlobal";
// mui icons
import CloseIcon from "@mui/icons-material/Close";
import DehazeIcon from "@mui/icons-material/Dehaze";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";

export default function ButtonAppBar({ handleDarkMode }) {
  // =========== STATES===============
  const { darkMode, setIsSideBarOpen, isSideBarOpen } = useGlobal();
  const { isLoggined, userInfo } = useLogin();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("login");

  // =========== EVENT HANDLERS ===============

  const handleLogin = () => {
    setOpen(!open);
    setName(() => "login");
  };

  const handleSignUp = () => {
    setOpen(!open);
    setName(() => "sign up");
  };

  // =========== USE-EFFECT ===============

  useEffect(() => {
    if (!isLoggined) {
      setOpen(true);
      setName("login");
    } else {
      setOpen(false);
    }
  }, [isLoggined]);

  return (
    <div className="top-0 sticky z-[100] bg-white dark:bg-slate-800">
      <div className="w-full flex justify-between items-center h-[5rem] shadow-md border-b dark:border-b-dimWhite">
        {/* Title */}
        <div className="flex justify-center items-center">
          <div className="ml-5">
            {isLoggined && !isSideBarOpen && (
              <DehazeIcon
                className="cursor-pointer dark:text-white text-blue-500"
                sx={{ fontSize: "2.5rem" }}
                onClick={() => setIsSideBarOpen(true)}
              />
            )}
            {isLoggined && isSideBarOpen && (
              <CloseIcon
                className="cursor-pointer dark:text-white text-blue-500"
                sx={{ fontSize: "2.5rem" }}
                onClick={() => setIsSideBarOpen(false)}
              />
            )}
          </div>
          {!isSideBarOpen && (
            <Link to="/">
              <img src={logo} alt="logo" className="w-[7rem] h-[4rem]" />
            </Link>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-around w-[14rem] items-center  mr-2">
          {!isLoggined && (
            <>
              <button
                className="bg-blue-300 hover:bg-blue-500 rounded-full py-2 px-4 text-white font-semibold text-lg"
                onClick={handleLogin}
              >
                Log in
              </button>
              <button
                className="bg-slate-200 hover:bg-slate-300 rounded-full py-2 px-4 font-semibold text-lg"
                onClick={handleSignUp}
              >
                Sign up
              </button>
            </>
          )}
          {/* DARK-LIGHT-MODE START */}
          {isLoggined && (
            <div className="flex items-center justify-center gap-x-2">
              {darkMode ? (
                <LightModeIcon
                  className="cursor-pointer dark:text-[#F7F8FA] mt-1 "
                  onClick={handleDarkMode}
                  sx={{ fontSize: "1.7rem" }}
                />
              ) : (
                <DarkModeIcon
                  className="text-blue-500 cursor-pointer mt-1"
                  onClick={handleDarkMode}
                  sx={{ fontSize: "1.7rem" }}
                />
              )}
              {/* NOTIFICATION */}
              <Notification userInfo={userInfo} />
              {/*  USER */}
              <p className="text-xl text-blue-500 font-semibold dark:text-white capitalize -mr-2">
                {userInfo.name}
              </p>
              <ProfileMenu darkMode={darkMode} />
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      <LoginModal
        open={open}
        handleOpen={handleLogin}
        setOpen={() => setOpen(!open)}
        buttonLabel={name}
        setName={setName}
      />
    </div>
  );
}

// notifications sub-component
