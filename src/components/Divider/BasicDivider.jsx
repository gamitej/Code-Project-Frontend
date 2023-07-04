import { Divider } from "@mui/material";
import React from "react";

const BasicDivider = ({ textAlign = "center", text = "Error Occured" }) => {
  return (
    <div className="w-[100%]">
      <Divider textAlign={textAlign}>{text}</Divider>
    </div>
  );
};

export default BasicDivider;
