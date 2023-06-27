import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
// import { data } from "./makeData";

//defining columns outside of the component is fine, is stable
const columns = [
  {
    accessorKey: "sno",
    header: "S.no",
    size: 40,
  },
  {
    accessorKey: "level",
    header: "Level",
    size: 40,
  },
  {
    accessorKey: "question",
    header: "Question",
    size: 220,
  },
  {
    accessorKey: "url",
    header: "Question Link",
    size: 220,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 40,
  },
  {
    accessorKey: "platform",
    header: "Platform",
    size: 40,
  },
];

const borderRadius = "0.5rem";
const border = "0.1rem solid lightgray";

const BasicTable = ({
  title = "",
  height,
  rows = [],
  isLoading = false,
  enableFullScreen = false,
  enableDowloadCsv = false,
}) => {
  return (
    <MaterialReactTable
      data={rows}
      columns={columns}
      enableStickyHeader
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
      renderTopToolbarCustomActions={() => (
        <TableToolBar
          title={title}
          rows={rows}
          enableDowloadCsv={enableDowloadCsv}
        />
      )}
    />
  );
};

function TableToolBar({ title, rows, enableDowloadCsv }) {
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);
  const handleExportData = () => {
    csvExporter.generateCsv(rows);
  };
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
      {enableDowloadCsv && (
        <Button
          color="primary"
          variant="contained"
          onClick={handleExportData}
          sx={{ fontSize: ".8rem" }}
          startIcon={<FileDownloadIcon />}
        >
          Export Data
        </Button>
      )}
    </Box>
  );
}
export default BasicTable;
