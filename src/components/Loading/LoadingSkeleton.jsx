import React from "react";
// mui
import { Skeleton, Stack } from "@mui/material";
import { useGlobal } from "../../store/global/useGlobal";

const LoadingSkeleton = ({ className = "", page = "home" }) => {
  const { darkMode } = useGlobal();
  // ====================== HOME PAGE SKELETON ====================
  if (page === "home") {
    return (
      <div className={`${className}`}>
        <Stack spacing={1}>
          {/* <Skeleton variant="rectangular" width={250} height={120} /> */}
          <Skeleton
            variant="rounded"
            width="100%"
            height={200}
            sx={{ backgroundColor: darkMode ? "lightgray" : "" }}
          />
          <div
            className="flex justify-between items-center "
            style={{ width: "100%" }}
          >
            <Skeleton
              variant="text"
              sx={{
                fontSize: "1rem",
                backgroundColor: darkMode ? "lightgray" : "",
              }}
              width="75%"
              height={60}
            />
            <Skeleton
              variant="circular"
              width="20%"
              height={60}
              sx={{ backgroundColor: darkMode ? "lightgray" : "" }}
            />
          </div>
        </Stack>
      </div>
    );
  }

  // ====================== OVERVIEW PAGE SKELETON ====================
  if (page === "overview") {
    return (
      <div className={`${className}`}>
        <Skeleton
          variant="text"
          sx={{
            fontSize: "1rem",
            backgroundColor: darkMode ? "lightgray" : "",
          }}
          width="100%"
          height={60}
        />
        <Stack spacing={1}>
          {/* <Skeleton variant="rectangular" width={250} height={120} /> */}
          <Skeleton
            variant="rounded"
            width="100%"
            height={300}
            sx={{ backgroundColor: darkMode ? "lightgray" : "" }}
          />
        </Stack>
      </div>
    );
  }
};

export default LoadingSkeleton;
