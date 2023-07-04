import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";

const borderRadius = "0.5rem";
const border = "0.1rem solid lightgray";

const BasicTable = ({
  title = "",
  height,
  rows = [],
  columns = [],
  isLoading = false,
  enableFullScreen = false,
}) => {
  return (
    <MaterialReactTable
      data={rows}
      columns={columns}
      enableStickyHeader
      enableGlobalFilter={false}
      enableDensityToggle={false}
      enableColumnActions={false}
      muiTablePaperProps={{
        elevation: 3,
        sx: {
          borderRadius: borderRadius,
          border: border,
        },
      }}
      state={{ isLoading: isLoading }}
      enableFullScreenToggle={enableFullScreen}
      muiTableContainerProps={{ sx: { height: height } }}
      muiTopToolbarProps={{ sx: { borderRadius } }}
      muiTableBodyCellProps={{
        sx: { fontSize: "0.9rem", whiteSpace: "pre" },
      }}
      renderTopToolbarCustomActions={() => <TableToolBar title={title} />}
    />
  );
};

function TableToolBar({ title }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      ml="0.5rem"
      mt="0.5rem"
      height="2.5rem"
    >
      <Typography fontSize="1rem" fontWeight="bold" textTransform="uppercase">
        {title}
      </Typography>
    </Box>
  );
}
export default BasicTable;
