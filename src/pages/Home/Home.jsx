import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// mui
import CheckIcon from "@mui/icons-material/Check";
import { Box, CircularProgress, Fab, Typography } from "@mui/material";
// services
import { getAllTopics } from "../../services/ApiServices/Home/homeService";
// images
import logo from "../../assests/bg.jpg";
import FullScreenLoader from "../../components/Loading/FullScreenLoader";
import { useLogin } from "../../store/login/useLogin";
// comp
import { Error, LoadingSkeleton } from "../../components";

const Home = () => {
  const { userId } = useLogin();
  // ========= USE-STATES =============
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // ========= CALL ALL PINS API =============

  useEffect(() => {
    const callHomeApi = async () => {
      try {
        setLoading(true);
        const { data } = await getAllTopics(userId);
        setTopics(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    callHomeApi();
  }, []);

  if (isError) {
    return (
      <div className="h-[calc(100vh-5rem)] bg-[#F7F8FA] p-2">
        <p className="text-[2rem] font-semibold text-slate-500 text-center p-2 mb-4 font-sans">
          Explore
        </p>
        <Error />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-5rem)] bg-[#F7F8FA] p-2">
      <p className="text-[2rem] font-semibold text-slate-500 text-center p-2 mb-4 font-sans">
        Explore
      </p>
      <div className="flex justify-center items-center">
        <div className="grid  grid-cols-1  md:grid-cols-4 lg:grid-cols-6  gap-10 w-[80%] ">
          {/* Card loading skeleton */}
          {loading &&
            [1, 2].map((index) => (
              <LoadingSkeleton key={index} className="col-span-2 mt-5" />
            ))}
          {/* Card Comp */}
          {!loading &&
            topics?.map(({ title, total, solved, urlTitle }, index) => (
              <NavLink
                to={`/explore/${urlTitle}`}
                className="h-[20rem] col-span-2 rounded-lg shadow-xl  bg-white p-2 hover:shadow-red-200 transform transition-all hover:scale-105 cursor-pointer"
                key={index}
              >
                <div className="relative w-full h-[75%] ">
                  <p className="absolute top-2 left-2 text-white font-semibold text-2xl">
                    {title}
                  </p>
                  <img
                    src={logo}
                    srcSet={logo}
                    alt="image"
                    className="h-full w-full rounded-md"
                    loading="lazy"
                  />
                </div>
                <div className="flex justify-around items-center h-[25%]">
                  <SubPara label="solved" value={solved} />
                  <SubPara label="total" value={total} />

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
    </div>
  );
};

function SubPara({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-3xl font-semibold">{value}</p>
      <p className="text-md font-semibold text-stone-400">{label} </p>
    </div>
  );
}

function CircularProgressWithLabel(props) {
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
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default Home;
