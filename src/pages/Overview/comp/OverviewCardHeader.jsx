import React, { useEffect, useState } from "react";
// data
import { filterData } from "./data";
import { filterCardData } from "./event";
// mui
import {
  Menu,
  Switch,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Badge,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useOverview } from "../../../store/overview/useOverview";

const OverviewCardHeader = ({
  color,
  cardType,
  cardTitle,
  filters = {},
  totalCount = {},
  setFilters = () => {},
}) => {
  // ============= USE-STATE ====================

  const { setFilterBySolved, filterBySolved } = useOverview();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // ============= EVENT-HANDLERS ===============

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (e) => {
    setFilterBySolved(cardType);
    const name = e.target.name;
    const cardTypeName = filters[cardType];
    setFilters({
      ...filters,
      [cardType]: {
        ...filters[cardType],
        [name]: !cardTypeName[name],
      },
    });
  };

  // ============= CONSTANTS ===============

  const count = totalCount[cardType];
  const showCount =
    count?.done === count?.total
      ? count?.done !== 0
        ? "Completed"
        : "Empty"
      : `[${count?.done} / ${count?.total}]`;

  /**
   *  JSX
   */

  return (
    <div
      className="flex justify-between items-center p-3 rounded-tr-xl rounded-tl-xl select-none"
      style={{ backgroundColor: color }}
    >
      {/* Title */}
      <p className="text-xl text-slate-700">
        {cardTitle} - {showCount}
      </p>
      {/* Filter */}
      <Tooltip title="Filters" placement="top" onClick={handleClick} arrow>
        <Badge
          color="secondary"
          badgeContent={filterBySolved[cardType] ? 1 : 0}
        >
          <FilterListIcon
            className="text-slate-500 cursor-pointer"
            sx={{ fontSize: "2rem", display: "none" }}
          />
        </Badge>
      </Tooltip>
      <MenuComp
        open={open}
        cardType={cardType}
        anchorEl={anchorEl}
        filters={filters}
        handleClose={handleClose}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

// sub-comps
function MenuComp({
  open,
  anchorEl,
  filters = {},
  cardType = "",
  handleClose = () => {},
  handleFilterChange = () => {},
}) {
  return (
    <React.Fragment>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <FormGroup sx={{ marginLeft: "12px", userSelect: "none" }}>
          {filterData?.map(({ name, label }, index) => (
            <FormControlLabel
              key={index}
              control={
                <Switch
                  size="small"
                  checked={filters[cardType][name]}
                  onChange={handleFilterChange}
                  name={name}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </Menu>
    </React.Fragment>
  );
}

export default React.memo(OverviewCardHeader);
