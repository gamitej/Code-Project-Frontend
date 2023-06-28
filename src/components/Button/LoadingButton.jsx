import { Button, CircularProgress } from "@mui/material";
import React from "react";

const LoadingButton = ({
  btnSize = "large",
  loadingSize = 20,
  isLoading = false,
  variant = "contained",
  type = "submit",
  clsName = "",
  label = "",
  width = "",
}) => {
  return (
    <Button
      type={type}
      size={btnSize}
      variant={variant}
      disabled={isLoading}
      startIcon={
        <CircularProgress
          size={loadingSize}
          className="text-md"
          sx={{
            color: "whitesmoke",
            fontSize: "6px",
            display: isLoading ? "" : "none",
          }}
        />
      }
      className={`${clsName}`}
      sx={{ width }}
    >
      {label}
    </Button>
  );
};

export default LoadingButton;
