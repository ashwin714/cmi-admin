import React from "react";
import CommonLabel from "../CommonLabel/CommonLabel";
import { TextField } from "@mui/material";

const InputEmail = ({ label, isRequired, value, onChange, disabled, name }) => {
    const handleChange = (e) => {
      const msg = "You can only use letters, numbers, full stops( '.' ) and underscores( '_' ) here.";
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
        name={name}
        type="email"
        id={"outlined"}
        label={label}
        size="small"
        variant="outlined"
        onChange={handleChange}
        onInput={(e)=> e.target.setCustomValidity("")}
        inputProps={{ pattern: "^[A-Za-z0-9_]+([.]?[A-Za-z0-9_]+)*@[A-Za-z0-9_]+([.]?[A-Za-z0-9_]+)*([.]{1}[A-Za-z0-9_]{2,3})+$" }}
        value={value}
        required={isRequired}
        style={{ width: "100%" }}
        disabled={disabled}
      />
    </div>
  );
};

export default InputEmail;
