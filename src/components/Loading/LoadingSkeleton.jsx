import React from "react";
// mui
import { Skeleton, Stack } from "@mui/material";

const LoadingSkeleton = ({ className = "", page = "home" }) => {
  // ====================== HOME PAGE SKELETON ====================
  if (page === "home") {
    return (
      <div className={`${className}`}>
        <Stack spacing={1}>
          {/* <Skeleton variant="rectangular" width={250} height={120} /> */}
          <Skeleton variant="rounded" width="100%" height={200} />
          <div
            className="flex justify-between items-center "
            style={{ width: "100%" }}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              width="75%"
              height={60}
            />
            <Skeleton variant="circular" width="20%" height={60} />
          </div>
        </Stack>
      </div>
    );
  }

  // ====================== OVERVIEW PAGE SKELETON ====================

  return (
    <div className={`${className}`}>
      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem" }}
        width="100%"
        height={60}
      />
      <Stack spacing={1}>
        {/* <Skeleton variant="rectangular" width={250} height={120} /> */}
        <Skeleton variant="rounded" width="100%" height={300} />
      </Stack>
    </div>
  );
};

export default LoadingSkeleton;
