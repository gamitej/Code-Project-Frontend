import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// api
import { getSelectedTopicData, markQuestion } from "../../services";
// data
import { stateObj } from "./comp/data";
// comp
import { BackButton, FullScreenLoader } from "../../components";
import OverviewCardBody from "./comp/OverviewCardBody";
// mui
import { Divider } from "@mui/material";
import OverviewCardHeader from "./comp/OverviewCardHeader";
// utils
import colorCode from "../../utils/colorCode.json";
import { useLogin } from "../../store/login/useLogin";

const Overview = () => {
  const { name } = useParams();
  const { userId } = useLogin();

  // ============= USE-STATE =========================
  const [filters, setFilters] = useState(stateObj || {});
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState([]);

  // ============= EVENT-HANDLERS ====================

  // ============= CALL ALL PINS API =================

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const { data } = await getSelectedTopicData(userId, name);
        setCardData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  const callMarkQuestionApi = async (question_id) => {
    const data = await markQuestion(userId, question_id);
  };

  if (loading) {
    return <FullScreenLoader open={loading} title="loading questions" />;
  }

  return (
    <div className="bg-slate-100 h-[calc(100vh-5rem)]">
      <div className="relative bg-blue-300 flex justify-center items-center h-[10rem]">
        <h2 className="text-4xl font-semibold text-white capitalize">{name}</h2>
        <BackButton
          to="/"
          title="Back to explore"
          className="absolute top-2 left-4 "
        />
      </div>
      <div className="w-[95%] mt-10 m-auto grid grid-cols-3 lg:grid-cols-9 md:grid-cols-6 gap-4">
        {/* Card */}
        {cardData?.map(({ cardTitle, cardType, body }, index) => (
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
