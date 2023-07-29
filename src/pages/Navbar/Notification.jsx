import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
// comp
import { BasicMenu } from "../../components";
// mui
import { Badge, Button } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
// services
import { getNotification, notificationMarked } from "../../services";

function Notification({ userInfo }) {
  const [isNotification, setIsNotification] = useState(null);
  const [notiData, setNotiData] = useState([]);

  // ================= API-CALL ================

  // mark notifications
  const callMarkNotifApi = async (updatedNotiData) => {
    const req = updatedNotiData;
    const data = await notificationMarked({ ...userInfo, req });
    if (!data.error) {
      console.log(data.message);
    } else {
      toast.error("Something went wrong", { duration: 1200 });
    }
  };

  const handleMarkNotification = () => {
    const updatedNotiData = notiData.map((notification) => {
      return {
        ...notification,
        seen: true,
      };
    });
    setNotiData(updatedNotiData);
    callMarkNotifApi(updatedNotiData);
  };

  // get notifications
  const callGetNotifApi = async () => {
    const data = await getNotification(userInfo);
    if (!data.error) {
      setNotiData(data.data);
    }
  };

  useEffect(() => {
    callGetNotifApi();
  }, []);

  // =================== USE-MEMO ==================

  const unseenNotifications = useMemo(
    () => notiData?.filter((item) => item.seen === false),
    [notiData],
  );

  const notificationCount = unseenNotifications?.length || 0;

  useEffect(() => {
    document.title =
      notificationCount > 0 ? `(${notificationCount}) Code` : "Code";
    return () => {
      document.title = "Code";
    };
  }, [notificationCount]);

  /**
   * JSX
   */

  return (
    <BasicMenu
      open={isNotification}
      handleClose={() => setIsNotification(null)}
      handleOpen={(e) => setIsNotification(e.currentTarget)}
      icon={
        <Badge
          color="secondary"
          badgeContent={notificationCount}
          className="mt-1"
        >
          <CircleNotificationsIcon
            sx={{ fontSize: "2rem" }}
            className="text-blue-500 dark:text-white cursor-pointer"
          />
        </Badge>
      }
    >
      <div className="flex flex-col w-[20rem] h-[13rem]">
        <div className="flex flex-col items-start gap-2 mb-2 p-2 h-[11rem] overflow-auto break-words">
          {/* NO DATA */}
          {notiData.length === 0 && (
            <p className="text-slate-500 font-semibold flex justify-center items-center h-full w-full">
              No notifications
            </p>
          )}
          {/* NOTIFIATION DATA */}
          {notiData?.map((item, idx) => (
            <React.Fragment key={idx}>
              <p
                className={`${
                  item.seen ? "border-white" : "border-red-300"
                } border-l-4 w-full p-2 text-slate-500 text-md`}
              >
                {item?.text}
              </p>
              <p className="border-b border-slate-300 w-full"></p>
            </React.Fragment>
          ))}
        </div>
        {/* BUTTON */}
        <div className="flex justify-center  items-center w-full">
          <Button
            variant="contained"
            size="small"
            onClick={handleMarkNotification}
          >
            Mark as read
          </Button>
        </div>
      </div>
    </BasicMenu>
  );
}

export default Notification;
