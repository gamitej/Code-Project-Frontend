import React from "react";
// mui
import { Divider } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// utils
import colorCode from "../../../utils/colorCode.json";
import { Link } from "react-router-dom";

const OverviewCardBody = ({
  cardType,
  cardBodyData = [],
  setCardData = () => {},
}) => {
  // ============== EVENT-HANDLER ==================
  const handleMark = (id, value) => {
    setCardData((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.cardType === cardType) {
          const updatedBody = card.body.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                solved: !value,
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
  };

  const getColor = (solved) => {
    return solved ? colorCode["done"] : colorCode["skip"];
  };

  return (
    <div id="hideScrollBar" className="overflow-auto h-[calc(22rem-4rem)]">
      {cardBodyData?.map(({ name, url, platform, solved, id }) => (
        <React.Fragment key={id}>
          <div className="grid grid-cols-8 p-4 hover:bg-slate-100 cursor-pointer">
            <TaskAltIcon
              onClick={() => handleMark(id, solved)}
              className="col-span-1 hover:text-slate-400"
              style={{
                color: getColor(solved),
              }}
            />
            <p
              className="col-span-5 text-slate-600"
              style={{
                color: getColor(solved),
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
            <p
              className="col-span-2 text-slate-400 m-auto"
              style={{
                color: getColor(solved),
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
