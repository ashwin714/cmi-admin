import React from "react";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import CommonLabel from "../CommonLabel/CommonLabel";
import { GetFormattedDate } from "../../app/HelperFunction";
import moment from "moment";

const CommonDatePicker = ({
  label,
  isRequired,
  minDate,
  maxDate,
  value,
  onChange,
  disabled
}) => {
  const handleChange = (e) => onChange(GetFormattedDate(e,"YYYY-MM-DD"));
  
  return (
    <>
      <div className="inputpadding datewidth">
        <CommonLabel label={label} mandatory={isRequired} />
        <br />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker 
            //value={moment(value ? value : new Date()).format()}
            value={moment(value )}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} required={isRequired} />
            )}
            minDate={minDate}
            maxDate={maxDate}
            mandatory={isRequired}
            disabled={disabled}
            style={{ width: "100%" }}
            inputFormat="dd/MM/yyyy"
          />
          {/* <p className="smalltext">
            Date uses "month day, year" format (e.g. August 1, 2002)
          </p> */}
        </LocalizationProvider>
      </div>
    </>
  );
};

export default CommonDatePicker;
