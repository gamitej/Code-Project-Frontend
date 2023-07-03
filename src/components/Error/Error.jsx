import React from "react";

const Error = ({ title = "Error", text = "Unable to fetch data" }) => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="border-2 border-red-300 rounded-lg p-8 flex flex-col gap-y-4 items-center bg-red-100">
        <p className="text-4xl font-semibold text-red-400 flex justify-center items-center gap-x-4">
          {title}
        </p>
        <p className="text-3xl font-semibold text-red-400">{text}</p>
      </div>
    </div>
  );
};

export default Error;
