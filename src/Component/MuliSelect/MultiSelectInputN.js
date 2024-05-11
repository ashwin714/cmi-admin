import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import CommonLabel from '../CommonLabel/CommonLabel';
import { useEffect } from 'react';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Park',
  'Gym',
  'Lift',
  'AC',
  'Modular Kitchen'
];

export default function MultiSelectInputN({value,label,isRequired,onChange, dataSet, getOptionLabel,getOptionValue}) {
  const [selected, setSelected] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [selectedValue, setSelecetedValue] = useState([]);
 
  const handleChange = (event,obj) => {
    const {
      target: { value }
    } = event;
    setSelected( typeof value === "string" ? value.split(",") : value);
    // on selecting first option, will return
    // .$8271e42a-8982-44b8-9745-3271e0cf9d12
    //console.log(value,"valuevalue");
  };

  useEffect(()=>{
   if(selected){
   var selectedArr=[]
    selected?.map((item)=>{
      return selectedArr.push({id:item,place:"",district:""});
    });
    setFilteredArr(selectedArr);
  }
  },[selected]);

  useEffect(()=>{    
    onChange(filteredArr);
  },[filteredArr]);

  useEffect(()=>{
    if(value){
     var setSeleceted=value?.map(x=>x.id);
      setSelecetedValue(setSeleceted);
    }
   
  },[value]);
  // useEffect(()=>{
    
  //   setSelected(selectedValue);
  //   console.log(value,"valuevalue3333 multislect")
  // },[selectedValue]);

  return (
    <div>
      <FormControl sx={{ width: "100%", }}>
        {/* <CommonLabel label={label} mandatory={isRequired} /> */}
        <InputLabel id="demo-multiple-checkbox-label" className='multi'>{label} <span>{}</span></InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          size='small'
          value={selected}
          onChange={handleChange}
          //renderValue={(selected) => selected.join(", ")}
          renderValue={(selected) => selected?.map(obj=> dataSet[obj - 1]?.[getOptionLabel])?.join(", ")}
        >
          {dataSet?.map((name) => (
            <MenuItem key={name.id} value={name?.id}>
              <Checkbox checked={selected.indexOf(name?.id) > -1} />
              <ListItemText primary={name[getOptionLabel]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}