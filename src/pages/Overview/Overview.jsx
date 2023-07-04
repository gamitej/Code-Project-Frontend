import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import colorCode from "../../utils/colorCode.json";
import { useLogin } from "../../store/login/useLogin";

const Overview = () => {
  const { name: topic } = useParams();
  const { userInfo } = useLogin();

  // ============= USE-STATE =========================
  const [filters, setFilters] = useState(stateObj || {});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const [cardData, setCardData] = useState([]);

  // ============= EVENT-HANDLERS ====================

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

  const callMarkQuestionApi = async (question_id) => {
    const data = await markQuestion({ ...userInfo, question_id });
  };

  if (isError.status) {
    return (
      <div className="bg-slate-100 h-[calc(100vh-5rem)]">
        <div className="relative bg-blue-300 flex justify-center items-center h-[10rem]">
          <h2 className="text-4xl font-semibold text-white capitalize">
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

  return (
    <div className="bg-slate-100 h-[calc(100vh-5rem)]">
      <div className="relative bg-blue-300 flex justify-center items-center h-[10rem]">
        <h2 className="text-4xl font-semibold text-white capitalize">
          {topic}
        </h2>
        <BackButton
          to="/"
          title="Back to explore"
          className="absolute top-2 left-4 "
        />
      </div>
      <div className="w-[95%] mt-10 m-auto grid grid-cols-3 lg:grid-cols-9 md:grid-cols-6 gap-4">
        {/* Card */}
        {/* Card loading skeleton */}
        {loading &&
          [1, 2, 3].map((index) => (
            <LoadingSkeleton
              page="overview"
              className="col-span-3"
              key={index}
            />
          ))}
        {/* Card Comp */}
        {!loading &&
          cardData?.map(({ cardTitle, cardType, body }, index) => (
            <div
              key={index}
              className="col-span-3 shadow-md rounded-xl min-w-[20rem] h-[22rem] bg-white"
            >
              {/* Card Header */}
              <OverviewCardHeader
                filters={filters}
                cardType={cardType}
                cardTitle={cardTitle}
                setFilters={setFilters}
                setCardData={setCardData}
                color={colorCode[cardType]}
              />
              <Divider />
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
