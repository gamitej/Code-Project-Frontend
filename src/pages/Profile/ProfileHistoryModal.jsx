import { BasicModal } from "../../components";
import React, { useMemo } from "react";
// libs
import moment from "moment";
// mui
import { Divider } from "@mui/material";
// store
import { useGlobal } from "../../store/global/useGlobal";

const ProfileHistoryModal = ({ open, setOpen, data = [] }) => {
  const { darkMode } = useGlobal();

  // ================= USE_MEMO =====================

  const historyData = useMemo(
    () => data?.filter((item) => item.done === "Yes"),
    [data],
  );

  // ================= EVENT-HANDLERS =====================
  const formateDate = (date) => {
    const newDate = moment(date).format("MM/DD/YYYY");
    return newDate;
  };

  /**
   * JSX
   */

  return (
    <BasicModal
      open={open}
      handleClose={() => setOpen(false)}
      handleOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      width="85rem"
    >
      <div className="flex flex-col w-[95%] m-auto  mt-[3rem] h-[90%]">
        <h1 className="text-purple-600 text-2xl dark:text-white underline text-center -mt-5">
          Question Solved
        </h1>
        {/* HEADER */}
        <div className="grid grid-cols-9 h-full overflow-auto mt-5">
          <div className="col-span-2 capitalize underline text-xl text-blue-500 ">
            <h1>topic</h1>
          </div>
          <div className="col-span-1 capitalize underline text-xl text-blue-500">
            <h1>date</h1>
          </div>
          <div className="col-span-5 capitalize underline text-xl text-blue-500">
            <h1>question</h1>
          </div>
          <div className="col-span-1 capitalize underline text-xl text-blue-500">
            <h1>level</h1>
          </div>
        </div>
        <Divider sx={{ backgroundColor: darkMode ? "silver" : "" }} />
        {/* DATA */}
        {historyData?.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="grid grid-cols-9 h-full overflow-auto items-center">
              <div className="col-span-2 dark:text-white ">
                <p>{item?.topic}</p>
              </div>
              <div className="col-span-1 dark:text-white">
                <p>{formateDate(item?.date)}</p>
              </div>
              <div className="col-span-5 dark:text-white">
                <p>{item?.question}</p>
              </div>
              <div className="col-span-1 capitalize dark:text-white">
                <p>{item?.level}</p>
              </div>
            </div>
            <Divider sx={{ backgroundColor: darkMode ? "silver" : "" }} />
          </React.Fragment>
        ))}
      </div>
    </BasicModal>
  );
};

export default ProfileHistoryModal;
