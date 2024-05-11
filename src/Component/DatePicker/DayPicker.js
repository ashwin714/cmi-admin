import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";

const DAYS = [
  {
    key: "monday",
    label: "M"
  },
  {
    key: "tuesday",
    label: "T"
  },
  {
    key: "wednesday",
    label: "W"
  },
  {
    key: "thursday",
    label: "T"
  },
  {
    key: "friday",
    label: "F"
  },
  {
    key: "saturday",
    label: "S"
  },
  {
    key: "sunday",
    label: "S"
  }
];


const ToggleDays = () => {
  const [days, setDays] = useState([0, 2, 3]);
  return (
    <>
      {/* <StyledToggleButtonGroup
        size="small"
        arial-label="Days of the week"
        value={days}
        onChange={(event, value) => setDays(value)}
      > */}
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {DAYS.map((day, index) => (
          <Button key={day.key} value={index} aria-label={day.key}>
            {day.label}
            <input type="hidden" value={days}/>
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

export default ToggleDays;
