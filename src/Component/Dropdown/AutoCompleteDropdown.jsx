import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CommonLabel from "../CommonLabel/CommonLabel";

const AutoCompleteDropdown = ({
  label,
  name,
  isRequired,
  selectedValue,
  onChange,
  onInputTextChange,
  inputText,
  dataSet,
  getOptionLabel,
  getOptionValue,
  disabled,
  showAdd,
  defaultValue,
  width
}) => {

  const check = (val) => {
    if (getOptionValue && dataSet) {
      const val1 = dataSet?.filter((val2) => val2[getOptionValue] == val);
      return (val1[0] ? val1[0] : null)
    } else {
      return (val ? val : null);
    }
  };

  const handleChange = (event, newValue) => {
    if (getOptionValue) {
      onChange(newValue ? newValue[getOptionValue] : null);
    } else {
      onChange(newValue);
    }
  };

  return (
    <>
      <div className="inputpadding">
        {/* {label && <CommonLabel label={label} mandatory={isRequired} />} */}
        <Autocomplete
          name={name}
          value={check(selectedValue)}
          onChange={handleChange}
          sx={{ width: width ? width : "100%" }}
          id={isRequired ? "outlined-required" : "outlined-basic"}
          variant="outlined"
          size="small"
          tabIndex={0}
          inputValue={inputText}
          defaultValue={defaultValue}
          onInputChange={(event, newInputValue) => {
            onInputTextChange && onInputTextChange(newInputValue);
          }}
          options={dataSet ? dataSet : []}
          getOptionLabel={(option) => option[getOptionLabel]}
          // sx={{ width: "100%" }}
          renderInput={(params) => (
            <>
              <TextField {...params} required={isRequired} label={label} />
              {showAdd && <label>Add New</label>}
            </>
          )}
          fullWidth
          disabled={disabled}

        />
      </div>
    </>
  );
};

export default AutoCompleteDropdown;
