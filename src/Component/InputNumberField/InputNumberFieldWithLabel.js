import React from "react";
import CommonLabel from "../CommonLabel/CommonLabel";
import { TextField, FormHelperText } from "@mui/material";

const InputNumberFieldWithLabel = ({
  type,
  label,
  isRequired,
  value,
  onChange,
  disabled,
  helperText,
  name,
  minLength,
  maxLength,
  exactLength,
  regex,
  errMessage,
  placeholder,
  hideRequired
}) => {

  let min = "0";
  let max = "";
  let exp = "*";
  let prev = "^[0-9.]*$";
  let next = "$";
  if (exactLength) {
    exp = "{" + exactLength + "}";
  } else {
    if (minLength) {
      min = minLength;
    }
    if (maxLength) {
      max = maxLength;
    }
    exp = "{" + min + "," + max + "}";
  }
  let regEx = prev + exp + next;

  const msg = "It should contain digits only.";

  const handleChange = (e) => {
    if (e.target.validity.valid) {
      e.target.setCustomValidity("");
    } else {
      if (regex || minLength || maxLength || exactLength) {
        errMessage && e.target.setCustomValidity(errMessage);
      } else {
        e.target.setCustomValidity(msg);
      }
    }
    onChange(e?.target?.value);
  };
  // console.log("regEx====>", regEx);
  return (
    <div className="inputpadding">
      {hideRequired===true?"":<CommonLabel label={label} mandatory={isRequired} />}
      <TextField
        type="number"
        name={name}
        id="outlined-basic"
        variant="outlined"
        placeholder={placeholder}
        onChange={handleChange}
        onInput={(e) => e.target.setCustomValidity("")}
        inputProps={{ inputMode: "numeric", pattern: regex ? regex : regEx }}
        value={value}
        required={isRequired}
        style={{ width: "100%" }}
        disabled={disabled}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </div>
  );
};

export default InputNumberFieldWithLabel;
