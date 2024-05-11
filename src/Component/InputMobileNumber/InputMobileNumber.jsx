import React from "react";
import CommonLabel from "../CommonLabel/CommonLabel";
import { TextField, FormHelperText } from "@mui/material";

const InputMobileNumber = ({
  label,
  isRequired,
  value,
  onChange,
  disabled,
  name
}) => {
  const handleChange = (e) => {
    const msg = "It should contains 10 digits starting with 6|7|8|9";
    if (e.target.validity.valid) {
      e.target.setCustomValidity("");
    } else {
        e.target.setCustomValidity(msg);
    }
    onChange(e?.target?.value);
  };

  return (
    <div className="inputpadding">
      {/* <CommonLabel label={label} mandatory={isRequired} /> */}
      <TextField
        type="text"
        name={name}
        id="outlined"
        label={label}
        variant="outlined"
        size="small"
        onChange={handleChange}
        onInput={(e) => e.target.setCustomValidity("")}
        inputProps={{ inputMode: "numeric", maxLength:10, pattern: "^[6789]{1}[0-9]{9}$" }}
        value={value}
        
        required={isRequired}
        style={{ width: "100%" }}
        disabled={disabled}
      />
      <FormHelperText>Enter 10 digit mobile number.</FormHelperText>
    </div>
  );
};

export default InputMobileNumber;
