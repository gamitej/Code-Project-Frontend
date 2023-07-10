import React from "react";
import { RadialChart } from "../../components";

const paraCss =
  "text-2xl font-sans shadow-lg rounded-lg p-2 border w-[16rem] text-center";

const ProfileStatus = () => {
  return (
    <div className="w-[90%] m-auto mb-4 h-[37rem] sm:h-[20rem] flex flex-col sm:flex-row  items-center justify-center gap-x-[10rem] gap-y-2">
      <div>
        <div className="relative">
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500">
            56/200
          </p>
          <RadialChart />
        </div>
      </div>
      <div className="flex flex-col justify-around items-center h-full">
        <p className={`${paraCss} bg-green-200`}>Easy - (12/50)</p>
        <p className={`${paraCss} bg-orange-200`}>Medium - (12/50)</p>
        <p className={`${paraCss} bg-red-200`}>Hard - (12/50)</p>
      </div>
    </div>
  );
};

export default ProfileStatus;
