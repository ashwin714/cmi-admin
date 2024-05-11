import React from "react";
import { Select, MenuItem, FormControl, FormHelperText, Button } from "@mui/material";
import CommonLabel from "../CommonLabel/CommonLabel";
import { Add } from "@mui/icons-material";


const Dropdown = ({
  label,
  getOptionLabel,
  getOptionValue,
  isRequired,
  selectedValue,
  onChange,
  dataSet,
  helperText,
  name,
  showAdd
}) => {
  const handleChange = (e) => onChange(e.target.value);
  const check = (val) => {
    if(getOptionValue && dataSet){
      const val1 = dataSet?.filter((val2)=> val2[getOptionValue] == val);
      return(val1[0] ? val1[0] : null)
    }else{
      return(val ? val : null);
    }
  };
  const handleAdd=()=>{
    alert("handle add owner");
  }

  return (
    <>
      <div>
        <FormControl
        // sx={{ m: 1, minWidth: 120 }}
        style={{width:"100%"}}
        >
          <CommonLabel label={label} mandatory={isRequired} />
          <Select
            name={name}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
           // value={check(selectedValue)}
            //   label="Age"
            onChange={handleChange}
            style={{width:"100%"}}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {dataSet?.length > 0 &&
              dataSet?.map((val) => {
                return (
                  <MenuItem value={val[getOptionValue]}>
                    {val[getOptionLabel]}
                  </MenuItem>
                );
              })}
              {showAdd&&
               <MenuItem value="">
                 <Add/> <Button onClick={handleAdd}>Add New Owner</Button>
             </MenuItem>}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      </div>
    </>
  );
};

export default Dropdown;
