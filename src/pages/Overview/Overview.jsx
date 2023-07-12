import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { sortBy, get, orderBy } from "lodash";
// api
import { getSelectedTopicData, markQuestion } from "../../services";
// data
import { stateObj } from "./comp/data";
// comp
import { BackButton, Error, LoadingSkeleton } from "../../components";
import OverviewCardBody from "./comp/OverviewCardBody";
// mui
import { Divider } from "@mui/material";
import OverviewCardHeader from "./comp/OverviewCardHeader";
// utils
import { calcDoneQueCount } from "./comp/event";
import colorCode from "../../utils/colorCode.json";
import { useLogin } from "../../store/login/useLogin";
import nameMapping from "../../utils/nameMapping.json";
import { useGlobal } from "../../store/global/useGlobal";

const Overview = () => {
  const { name: topic } = useParams();
  const { userInfo } = useLogin();
  const { darkMode } = useGlobal();

  // ============= USE-STATE =========================

  const [filters, setFilters] = useState(stateObj || {});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const [cardData, setCardData] = useState([]);

  // ============= EVENT-HANDLERS ====================

  const totalCount = useMemo(() => {
    const countData = calcDoneQueCount(cardData);
    return countData;
  }, [cardData]);

  // ============= CALL ALL PINS API =================

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const { data } = await getSelectedTopicData({ ...userInfo, topic });
        if (!data.error) {
          setCardData(data);
        } else {
          setIsError({ status: true, msg: data.message });
        }
      } catch (error) {
        console.log(error);
        setIsError({ status: true, msg: "Something went wrong" });
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  // question mark as done api
  const callMarkQuestionApi = async (question_id) => {
    try {
      const data = await markQuestion({ ...userInfo, question_id, topic });
      console.log(data);
      if (!data.error) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // ===================== ERROR PAGE =====================
  if (isError.status) {
    return (
      <div className="bg-slate-100 h-[calc(100vh-5rem)]">
        <div className="relative bg-blue-300 flex justify-center items-center h-[10rem] dark:bg-slate-800">
          <h2 className="text-4xl font-semibold text-white capitalize underline">
            {topic}
          </h2>
          <BackButton
            to="/"
            title="Back to explore"
            className="absolute top-2 left-4 "
          />
        </div>
        <Error text={isError.msg} />
      </div>
    );
  }

  /**
   * JSX
   */

  return (
    <div className="bg-slate-100 h-[150vh] lg:h-[calc(100vh-5rem)] dark:bg-slate-800">
      <div className="relative bg-blue-300 flex justify-center items-center h-[10rem] dark:bg-slate-700 border-b">
        <h2 className="text-4xl font-semibold text-white capitalize underline">
          {nameMapping[topic]}
        </h2>
        <BackButton
          to="/"
          title="Back to explore"
          className="absolute top-2 left-4 "
        />
      </div>
      <div className="w-[95%] mt-10 m-auto grid grid-cols-3 lg:grid-cols-9 md:grid-cols-6 gap-4 ">
        {/* Card */}
        {/* Card loading skeleton */}
        {loading &&
          [1, 2, 3].map((index) => (
            <LoadingSkeleton
              page="overview"
              className="col-span-3 min-w-[20rem]"
              key={index}
            />
          ))}
        {/* Card Comp */}
        {!loading &&
          cardData?.map(({ cardTitle, cardType, body }, index) => (
            <div
              key={index}
              className="col-span-3 shadow-md rounded-xl min-w-[20rem] h-[23rem] bg-white dark:bg-slate-800 border"
            >
              {/* Card Header */}
              <OverviewCardHeader
                filters={filters}
                cardType={cardType}
                cardTitle={cardTitle}
                totalCount={totalCount[2] || {}}
                setFilters={setFilters}
                cardData={cardData}
                setCardData={setCardData}
                color={colorCode[cardType]}
              />
              <Divider sx={{ backgroundColor: darkMode ? "white" : "" }} />
              {/* Card Body */}
              <OverviewCardBody
                cardType={cardType}
                cardBodyData={body}
                setCardData={setCardData}
                callMarkQuestionApi={callMarkQuestionApi}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Overview;
