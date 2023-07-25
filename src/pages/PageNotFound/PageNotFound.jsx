import React from "react";
import notFound from "../../assests/not-found.png";
const PageNotFound = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] w-full justify-center items-center">
      <img
        alt=""
        src={notFound}
        style={{ height: "35%", weight: "35%" }}
        className="-mt-[5rem]"
      />
    </div>
  );
};

export default PageNotFound;
