import React from "react";
import CommonLabel from "../CommonLabel/CommonLabel";
import { TextField, FormHelperText } from "@mui/material";

const InputTimePicker = ({
  type,
  label,
  isRequired,
  value,
  onChange,
  disabled,
  helperText,
  name,
  multiLine,
  rows,
  regex,
  errMessage,
  maxLength,
  minLength
}) => {
  const regEx = "^((?!>|<|--).)*$";
  const msg1 = "It should not contain following strings. i.e. ' < ' , ' > ' , ' -- ' etc. ";
  const handleChange = (e) => {
    if(e.target.validity.valid){
      e.target.setCustomValidity("");
    }else{
      if (regex) {
        errMessage && e.target.setCustomValidity(errMessage);
      } else {
        e.target.setCustomValidity(msg1);
      }
    }
    onChange(e?.target?.value);
  };
  
  return (
    <div className="inputpadding">
      {/* <CommonLabel label={label} mandatory={isRequired} /> */}
      <TextField
        type="time"
        name={name}
        label={label}
        id="outlined"
        variant="outlined"
        onChange={handleChange}
        className="dateInput"
        onInput={(e)=> e.target.setCustomValidity("")}
        value={value}
        required={isRequired}
        InputLabelProps={{ shrink: true }}
        //inputProps={{ pattern: regex ? regex : regEx , maxLength: maxLength, minLength:minLength }}
        style={{ width: "100%" }}
        disabled={disabled}
       // multiline={multiLine}
        //rows={rows}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </div>
  );
};

export default InputTimePicker;
