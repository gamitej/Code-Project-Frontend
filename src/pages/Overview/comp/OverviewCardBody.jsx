import React, { useEffect, useMemo, useState } from "react";
// mui
import { Divider, Tooltip } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
// utils
import colorCode from "../../../utils/colorCode.json";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLogin } from "../../../store/login/useLogin";
import { orderBy } from "lodash";
import { useOverview } from "../../../store/overview/useOverview";

const OverviewCardBody = ({
  cardType,
  cardBodyData = [],
  setCardData = () => {},
  callMarkQuestionApi = () => {},
}) => {
  // ==================== STORE ====================

  const { userInfo } = useLogin();
  const { filterBySolved } = useOverview();

  // ============== EVENT-HANDLER ==================

  const handleMark = async (que_id, value) => {
    if (value === false) {
      // api call
      const data = await callMarkQuestionApi({ userInfo, que_id });
      if (!data) {
        toast.error("Something went wrong", { duration: 1200 });
        return;
      }
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

  // ================== Color contants ====================

  const getColor = (solved) => (solved ? colorCode["done"] : colorCode["skip"]);

  const colorVal = (completed) => (completed ? getColor(completed) : "gray");

  /**
   * JSX
   */

  return (
    <div id="hideScrollBar" className="overflow-auto h-[calc(23rem-4rem)]">
      {cardBodyData &&
        cardBodyData?.map(
          ({ name, url, platform, completed, id, favorate }) => (
            <React.Fragment key={id}>
              <div className="grid grid-cols-8 p-3 hover:bg-slate-100 cursor-pointer">
                {/* STATUS */}
                <Tooltip
                  title={`${completed ? "Solved" : "Unsolved"}`}
                  placement="top"
                  arrow
                >
                  <TaskAltIcon
                    onClick={() => handleMark(id, completed)}
                    className="col-span-1 hover:text-slate-400 ml-4"
                    style={{
                      color: colorVal(completed),
                    }}
                  />
                </Tooltip>

                {/* QUESTION */}
                <p
                  className="col-span-6"
                  style={{
                    color: colorVal(completed),
                  }}
                >
                  <Link
                    to={url}
                    target="_blank"
                    className="hover:underline hover:text-blue-400"
                  >
                    {name}
                  </Link>
                </p>
                {/* <p className="-mr-4">
              {favorate ? (
                <StarBorderIcon
                  style={{
                    color: "gray",
                  }}
                />
              ) : (
                <StarIcon style={{ color: colorCode["medium"] }} />
              )}
            </p> */}
                {/* <p
              className="col-span-2 text-slate-400 m-auto capitalize"
              style={{
                color: colorVal(completed),
              }}
            >
              {platform}
            </p> */}
              </div>
              <Divider />
            </React.Fragment>
          ),
        )}
    </div>
  );
};

export default React.memo(OverviewCardBody);
