import React, { useState } from "react";
import CommonLabel from "../CommonLabel/CommonLabel";
import { TextField, FormHelperText } from "@mui/material";

const InputPassword = ({
  label,
  isRequired,
  value,
  onChange,
  disabled,
  showPassword,
  helperText,
  name
}) => {
  const msg = "Password must have 10-32 characters. It must contains atleast 1 uppercase, 1 lowercase, 1 digit, 1 special character from [ '!' , '@' , '#' , '$' , '%' , '^' , '&' , '*' , '?' , '|' , '.' ] and no space character.";
  const handleChange = (e) => {
    if (e.target.validity.valid) {
      e.target.setCustomValidity("");
    } else {
        e.target.setCustomValidity(msg);
    }
    onChange(e?.target?.value);
  };

  return (
    <>
      <div className="inputpadding">
        <CommonLabel label={label} mandatory={isRequired} />
        <TextField
          type={showPassword ? "text" : "password"}
          name={name}
          id="outlined-basic"
          variant="outlined"
          size="small"
          inputProps={{ pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*?|.])[a-zA-Z0-9!@#$%^&*?|.]{10,32}$" }}
          onChange={handleChange}
          onInput={(e)=> e.target.setCustomValidity("")}
          value={value}
          required={isRequired}
          style={{ width: "100%" }}
          disabled={disabled}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </div>
    </>
  );
};

export default InputPassword;
