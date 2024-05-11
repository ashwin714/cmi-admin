import React from "react";
import {
  Checkbox,
  RadioGroup,
  FormControlLabel,
  FormControl
} from "@mui/material";
import CommonLabel from "../CommonLabel/CommonLabel";
//import { CheckBox } from "@mui/icons-material";

// sample data set
// const set = [
//   { label: "Yes", value: "yes" },
//   { label: "No", value: "no" }
// ];

const CommonCheckboxGroup = ({dataSet, selectedValue, onChange, label, isRequired, row, disabled, name}) => {
  const handleChange = (e) => onChange(e.target.value);
  return (
    <>
      <div>
        <FormControl disabled={disabled}>
          <CommonLabel label={label} mandatory={isRequired} />
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name={name}
            value={selectedValue}
            onChange={handleChange}
            row={row}
          >
            {dataSet?.length > 0 &&
              dataSet?.map((val) => {
                return (
                  <FormControlLabel
                    value={val?.value}
                    control={<Checkbox  />}
                    label={val?.key}
                  />
                );
              })}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default CommonCheckboxGroup;
