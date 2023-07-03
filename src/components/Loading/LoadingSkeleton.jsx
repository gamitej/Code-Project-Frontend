import React from "react";
// mui
import { Skeleton, Stack } from "@mui/material";

const LoadingSkeleton = ({ className = "", page = "home" }) => {
  if (page === "home") {
    return (
      <div className={`${className}`}>
        <Stack spacing={1}>
          {/* <Skeleton variant="rectangular" width={250} height={120} /> */}
          <Skeleton variant="rounded" width={400} height={200} />
          <div
            className="flex justify-between items-center "
            style={{ width: 400 }}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              width={300}
              height={60}
            />
            <Skeleton variant="circular" width={80} height={60} />
          </div>
        </Stack>
      </div>
    );
  }
  return (
    <div className={`${className}`}>
      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem" }}
        width={500}
        height={60}
      />
      <Stack spacing={1}>
        {/* <Skeleton variant="rectangular" width={250} height={120} /> */}
        <Skeleton variant="rounded" width={500} height={300} />
      </Stack>
    </div>
  );
};

export default LoadingSkeleton;
