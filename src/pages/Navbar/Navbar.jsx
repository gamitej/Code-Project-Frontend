import React, { useEffect, useState } from "react";
// img
import logo from "../../assests/logo-2.png";
// comp
import { BasicMenu, ProfileMenu } from "../../components";
import LoginModal from "../../pages/Login/LoginModal";
// store
import { useLogin } from "../../store/login/useLogin";
import { useGlobal } from "../../store/global/useGlobal";
// mui icons
import CloseIcon from "@mui/icons-material/Close";
import DehazeIcon from "@mui/icons-material/Dehaze";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Button } from "@mui/material";
// services
import { getNotification } from "../../services";

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
    <div>
      <div className="w-full flex justify-between items-center h-[5rem] shadow-md border-b dark:border-b-dimWhite">
        {/* Title */}
        <div className="flex justify-center items-center">
          <div className="ml-5">
            {isLoggined && !isSideBarOpen && (
              <DehazeIcon
                className="cursor-pointer dark:text-white "
                sx={{ fontSize: "2.5rem" }}
                onClick={() => setIsSideBarOpen(true)}
              />
            )}
            {isLoggined && isSideBarOpen && (
              <CloseIcon
                className="cursor-pointer dark:text-white"
                sx={{ fontSize: "2.5rem" }}
                onClick={() => setIsSideBarOpen(false)}
              />
            )}
          </div>
          {!isSideBarOpen && (
            <div className="">
              <img src={logo} alt="logo" className="w-[7rem] h-[4rem]" />
            </div>
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

function Notification({ userInfo }) {
  const [isNotification, setIsNotification] = useState(null);
  const [notiData, setNotiData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const data = await getNotification(userInfo);
      console.log(data);
      if (!data.error) {
        setNotiData(data.data);
      }
    };
    callApi();
  }, []);

  return (
    <BasicMenu
      open={isNotification}
      handleClose={() => setIsNotification(null)}
      handleOpen={(e) => setIsNotification(e.currentTarget)}
      icon={
        <CircleNotificationsIcon
          sx={{ fontSize: "2rem" }}
          className="text-blue-500 dark:text-white cursor-pointer mt-1"
        />
      }
    >
      <div className="flex flex-col w-[20rem] h-[11rem]">
        <div className="flex flex-col items-start gap-2 mb-1 p-2 h-[9rem] overflow-auto break-words">
          {notiData.length === 0 && (
            <p className="text-slate-500 font-semibold flex justify-center items-center  h-full w-full">
              No notifications
            </p>
          )}
          {notiData?.map((item, idx) => (
            <React.Fragment key={idx}>
              <p
                className={`${
                  item.seen ? "border-white" : "border-red-300"
                } border-l-4 w-full p-2 text-slate-500`}
              >
                {item?.text}
              </p>
              <p className="border-b border-slate-300 w-full"></p>
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-center  items-center w-full">
          <Button variant="contained" size="small">
            Mark as read
          </Button>
        </div>
      </div>
    </BasicMenu>
  );
}
