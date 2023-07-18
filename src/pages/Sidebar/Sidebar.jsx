import React, { useState } from "react";
import { useGlobal } from "../../store/global/useGlobal";

function Sidebar() {
  const { isSideBarOpen } = useGlobal();

  return (
    <div className="flex">
      <div
        className={`top-0 left-0 mt-[5rem] fixed w-[15rem] z-10  h-[calc(100vh-5rem)] bg-gray-200 ease-in-out duration-300 ${
          isSideBarOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        {/* Sidebar content */}
        <p>hi</p>
      </div>
    </div>
  );
}

export default Sidebar;
