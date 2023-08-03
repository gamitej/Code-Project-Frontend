import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// comp
import { Error, LoadingSkeleton } from "../../components";
// images
import logo from "../../assests/bg.jpg";
import linkedlist from "../../assests/ll.png";
import tree from "../../assests/tree.png";
import heap from "../../assests/heap.png";

// store
import { useLogin } from "../../store/login/useLogin";
// mui
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Chip,
  CircularProgress,
  Fab,
  Tooltip,
  Typography,
} from "@mui/material";
// services
import { getAllTopics } from "../../services/ApiServices/Home/homeService";
// utils
import nameMapping from "../../utils/nameMapping.json";
import { useGlobal } from "../../store/global/useGlobal";

const urlMapping = {
  "tree-1": tree,
  "tree-2": tree,
  linkedlist,
  heap,
};

const Home = () => {
  const { darkMode } = useGlobal();
  const { userInfo } = useLogin();
  // ====================== USE-STATES ============================
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const [ongoingTopic, setOngoingTopic] = useState({ name: "", show: false });

  // ====================== EVENT-HANDLERS ========================

  const handleShowCard = (cardId) => {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth" });
    }
    cardElement.classList.add("highlighted");

    setTimeout(() => {
      cardElement.classList.remove("highlighted");
    }, 2000);
  };

  // =================== CALL ALL PINS API ========================

  const API_DATA = { id: userInfo.id, token: userInfo.token };

  useEffect(() => {
    const callHomeApi = async () => {
      try {
        setLoading(true);
        const { data } = await getAllTopics({ ...API_DATA });
        if (!data.error) {
          setTopics(data?.data);
          setOngoingTopic({
            name: data?.onGoingTopic.data,
            show: data?.onGoingTopic?.onGoingTopic,
          });
        } else {
          setIsError({ status: true, msg: data.message });
        }
      } catch (error) {
        setIsError({ status: true, msg: "" });
      } finally {
        setLoading(false);
      }
    };
    callHomeApi();
  }, []);

  // ======================== ERROR PAGE ==========================

  if (isError.status) {
    return (
      <div className="h-[calc(100vh-5rem)] bg-[#F7F8FA] p-2 dark:bg-slate-800">
        <p className="text-[2rem] font-semibold text-slate-500 text-center p-2 mb-4 font-sans">
          Explore
        </p>
        <Error text={isError.msg} />
      </div>
    );
  }

  /**
   *  JSX
   */

  return (
    <div className="bg-[#F7F8FA] dark:bg-slate-800 p-2">
      <p className="text-[2rem] font-semibold text-slate-500 text-center p-2 mb-2 underline dark:text-[#F7F8FA]">
        Explore
      </p>
      {/* ONGOING TOPIC */}
      <div className="h-[3rem] flex justify-center items-center  mb-4">
        {ongoingTopic?.show && (
          <Tooltip
            onClick={() => handleShowCard(ongoingTopic?.name)}
            className="text-2xl cursor-pointer"
            placement="top"
            title="click to view card"
            arrow
          >
            <p>
              {" "}
              <span className="text-slate-500 font-semibold dark:text-white">
                Ongoing Topic -
              </span>{" "}
              <span className="capitalize text-blue-400 font-semibold">
                {nameMapping[ongoingTopic?.name]}
              </span>
            </p>
          </Tooltip>
        )}
      </div>
      <div className="flex justify-center items-center">
        <div className="grid  grid-cols-1  md:grid-cols-4 lg:grid-cols-6  gap-10 w-[80%] ">
          {/* Card loading skeleton */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <LoadingSkeleton key={i} className="col-span-2 mt-5 w-full" />
            ))}
          {/* Card Comp */}
          {!loading &&
            topics?.map(({ title, total, solved, urlTitle }, index) => (
              <NavLink
                to={`/explore/${urlTitle}`}
                className="h-[20rem] col-span-2 rounded-lg shadow-xl dark:shadow-lg bg-white dark:bg-slate-800 border p-2  hover:shadow-red-200 transform transition-all hover:scale-105 cursor-pointer"
                key={index}
                id={urlTitle}
              >
                <div className="relative w-full h-[75%] ">
                  <p className="absolute top-2 left-2 text-white font-semibold text-2xl dark:text-slate-800">
                    {title}
                  </p>
                  {urlTitle === ongoingTopic?.name && (
                    <Chip
                      className="absolute top-2 right-2"
                      label="On-going"
                      sx={{
                        backgroundColor: "lightgoldenrodyellow",
                        cursor: "pointer",
                      }}
                    />
                  )}
                  <img
                    src={
                      urlMapping.hasOwnProperty(urlTitle)
                        ? urlMapping[urlTitle]
                        : logo
                    }
                    srcSet={
                      urlMapping.hasOwnProperty(urlTitle)
                        ? urlMapping[urlTitle]
                        : logo
                    }
                    alt="image"
                    className="h-full w-full rounded-md"
                    loading="lazy"
                  />
                </div>
                <div className="flex justify-around items-center h-[25%]">
                  <SubPara label="solved" value={solved} darkMode={darkMode} />
                  <SubPara label="total" value={total} darkMode={darkMode} />

                  {solved === total ? (
                    <Fab aria-label="save" color="primary">
                      <CheckIcon />
                    </Fab>
                  ) : (
                    <CircularProgressWithLabel
                      value={Math.round((solved / total) * 100)}
                    />
                  )}
                </div>
              </NavLink>
            ))}
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

function SubPara({ label, value, darkMode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-3xl font-semibold dark:text-white">{value}</p>
      <p className="text-md font-semibold text-stone-400 dark:text-white">
        {label}{" "}
      </p>
    </div>
  );
}

function CircularProgressWithLabel(props) {
  const { darkMode } = useGlobal();
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress size={50} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ color: darkMode ? "whitesmoke" : "" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default Home;
