import React, { useEffect, useState } from "react";
import { LoadingSkeleton, RadialChart } from "../../components";
import { getUserStatusData } from "../../services";

const paraCss =
  "text-2xl font-sans shadow-lg rounded-lg p-2 border w-[16rem] text-center";

const ProfileStatus = ({ userInfo }) => {
  // ================= USE-STATE ==================
  const [userStatus, setuserStatus] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= API CALL ==================

  // get profile dropdown api
  const callGetUserStatusApi = async () => {
    setLoading(true);
    try {
      const { data } = await getUserStatusData({ ...userInfo });
      if (!data.error) {
        setuserStatus(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= USE-EFFECT  ==================

  useEffect(() => {
    callGetUserStatusApi();
  }, []);

  const loadingSkeletion = (num, den, show) => {
    if (show) {
      return " 0 / 0";
    } else {
      return ` ${num} / ${den}`;
    }
  };

  /**
   * JSX
   */

  return (
    <div className="w-[90%] m-auto h-[37rem] sm:h-[20rem] flex flex-col sm:flex-row  items-center justify-center gap-x-[10rem] gap-y-2">
      <div>
        <div className="relative">
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500">
            {loadingSkeletion(
              userStatus?.totalSolved,
              userStatus?.total,
              loading,
            )}
          </p>
          <RadialChart
            series={[
              Math.round((userStatus?.totalSolved / userStatus?.total) * 100) ||
                "0",
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col justify-around items-center h-full">
        <p className={`${paraCss} bg-green-200`}>
          Easy -
          {loadingSkeletion(
            userStatus?.easySolved,
            userStatus?.easyTotal,
            loading,
          )}
        </p>
        <p className={`${paraCss} bg-orange-200`}>
          Medium -
          {loadingSkeletion(
            userStatus?.mediumSolved,
            userStatus?.mediumTotal,
            loading,
          )}
        </p>
        <p className={`${paraCss} bg-red-200`}>
          Hard -
          {loadingSkeletion(
            userStatus?.hardSolved,
            userStatus?.hardTotal,
            loading,
          )}
        </p>
      </div>
    </div>
  );
};

export default ProfileStatus;
