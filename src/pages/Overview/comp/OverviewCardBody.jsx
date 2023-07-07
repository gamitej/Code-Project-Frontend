import React from "react";
// mui
import { Divider, Tooltip } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// utils
import colorCode from "../../../utils/colorCode.json";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLogin } from "../../../store/login/useLogin";

const OverviewCardBody = ({
  cardType,
  cardBodyData = [],
  setCardData = () => {},
  callMarkQuestionApi = () => {},
}) => {
  const { userInfo } = useLogin();
  // ============== EVENT-HANDLER ==================

  const handleMark = (que_id, value) => {
    if (value === false) {
      // api call
      callMarkQuestionApi({ userInfo, que_id });
      // updating json
      setCardData((prevCards) => {
        const updatedCards = prevCards.map((card) => {
          if (card.cardType === cardType) {
            const updatedBody = card.body.map((item) => {
              if (item.id === que_id) {
                return {
                  ...item,
                  completed: !value,
                };
              }
              return item;
            });
            return {
              ...card,
              body: updatedBody,
            };
          }
          return card;
        });
        return updatedCards;
      });
      toast.success("Marked as done", { duration: 1200 });
    } else {
      toast.error("Already marked as done", { duration: 1200 });
    }
  };

  const getColor = (solved) => {
    return solved ? colorCode["done"] : colorCode["skip"];
  };

  return (
    <div id="hideScrollBar" className="overflow-auto h-[calc(22rem-4rem)]">
      {cardBodyData?.map(({ name, url, platform, completed, id }) => (
        <React.Fragment key={id}>
          <div className="grid grid-cols-8 p-4 hover:bg-slate-100 cursor-pointer">
            <Tooltip
              title={`${completed ? "Solved" : "Unsolved"}`}
              placement="top"
              arrow
            >
              <TaskAltIcon
                onClick={() => handleMark(id, completed)}
                className="col-span-1 hover:text-slate-400"
                style={{
                  color: getColor(completed),
                }}
              />
            </Tooltip>
            <Tooltip
              className="col-span-5 text-slate-600"
              style={{
                color: getColor(completed),
              }}
              title="click to view que"
              placement="top"
              arrow
            >
              <Link
                to={url}
                target="_blank"
                className="hover:underline hover:text-blue-400"
              >
                {name}
              </Link>
            </Tooltip>
            <p
              className="col-span-2 text-slate-400 m-auto capitalize"
              style={{
                color: getColor(completed),
              }}
            >
              {platform}
            </p>
          </div>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(OverviewCardBody);
