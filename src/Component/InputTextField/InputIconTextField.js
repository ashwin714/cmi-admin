import React from "react";
import CommonLabel from "../CommonLabel/CommonLabel";
import { TextField, FormHelperText, InputAdornment } from "@mui/material";

const InputIconTextField = ({
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
  minLength,
  placeholder,
  onFocus,
  onMouseDown,
  inputIcon
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
        type="text"
        name={name}
        label={label}
        id={"outlined"}
        variant="outlined"
        size="small"
        onChange={handleChange}
        onInput={(e)=> e.target.setCustomValidity("")}
        onFocus={onFocus}
        onMouseDown={onMouseDown}        
        placeholder={placeholder}
        value={value}
        required={isRequired}
        //inputProps={{ pattern: regex && regex, maxLength: maxLength, minLength:minLength }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{inputIcon}</InputAdornment>, pattern: regex && regex, maxLength: maxLength, minLength:minLength 
        }}
        style={{ width: "100%" }}
        disabled={disabled}
        multiline={multiLine}
        rows={rows}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </div>
  );
};

export default InputIconTextField;
