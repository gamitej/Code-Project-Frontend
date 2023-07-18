import { BasicModal } from "../../components";
import React, { useMemo } from "react";
// libs
import { orderBy } from "lodash";
import moment from "moment";
// mui
import { Divider } from "@mui/material";
// store
import { useGlobal } from "../../store/global/useGlobal";
// utils
import colorCode from "../../utils/colorCode.json";

const ProfileHistoryModal = ({ open, setOpen, data = [] }) => {
  const { darkMode } = useGlobal();

  // ================= USE_MEMO =====================

  const historyData = useMemo(() => {
    const sortedData = orderBy(data, ["date", "question"], ["desc", "asc"]);
    return sortedData?.filter((item) => item.done === "Yes");
  }, [data]);

  // ================= EVENT-HANDLERS =====================
  const formateDate = (date) => {
    const newDate = moment(date).format("DD-MM-YYYY");
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
      <div className="flex flex-col w-full m-auto h-full">
        <h1 className="text-purple-600 text-2xl font-semibold dark:text-white underline text-center mb-5">
          Question Solved
        </h1>

        {historyData?.length === 0 && (
          <div className="dark:text-white text-slate-400 text-4xl h-full flex justify-center items-center font-semibold">
            {" "}
            No Questions Solved{" "}
          </div>
        )}
        {/* HEADER */}
        {historyData?.length > 0 && (
          <div className="h-full overflow-auto w-full">
            <div className="grid grid-cols-9 mt-3 h-[8%] bg-slate-200 items-center p-3 font-semibold text-blue-500 sticky top-0">
              <div className="col-span-2 capitalize underline text-xl">
                <h1>topic</h1>
              </div>
              <div className="col-span-1 capitalize underline text-xl">
                <h1>date</h1>
              </div>
              <div className="col-span-5 capitalize underline text-xl">
                <h1>question</h1>
              </div>
              <div className="col-span-1 capitalize underline text-xl">
                <h1>level</h1>
              </div>
            </div>
            <Divider sx={{ backgroundColor: darkMode ? "silver" : "" }} />
            {/* DATA */}
            {historyData?.map((item, idx) => (
              <React.Fragment key={idx} className="h-full">
                <div className="grid grid-cols-9 items-center h-[10%] p-3 hover:bg-blue-100 dark:text-white dark:hover:text-slate-600  cursor-pointer">
                  <div className="col-span-2 ">
                    <p>{item?.topic}</p>
                  </div>
                  <div className="col-span-1 ">
                    <p>{formateDate(item?.date)}</p>
                  </div>
                  <div className="col-span-5 ">
                    <p>{item?.question}</p>
                  </div>
                  <div className="col-span-1 capitalize font-semibold">
                    <p
                      style={{
                        color: colorCode[item?.level.toUpperCase()],
                      }}
                    >
                      {item?.level}
                    </p>
                  </div>
                </div>
                <Divider sx={{ backgroundColor: darkMode ? "silver" : "" }} />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </BasicModal>
  );
};

export default ProfileHistoryModal;
