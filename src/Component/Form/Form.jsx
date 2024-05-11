import React from "react";

const Form = ({ data,meta,setFornFeild}) => {
  const handleFormFeildChange = (e, index, name) => {
    let arr1 = [...filterCriteria];
    let obj = arr1[index];
    let obj1 = {};
    obj1[name] = e;
    arr1[index] = { ...obj, ...obj1 };
    setFornFeild([...arr1]);
  };   

  return (
    <Grid containers>
                {meta?.filter?.map((feilds, index) => {
                  return (
                    <>
                      {feilds?.type == "date" && (
                        <Grid item md={feilds?.cols} sx={{ mb: 1 }}>
                          <InputDatePicker
                            type="date"
                            label={feilds?.title}
                            onChange={(e) =>
                              handleFormFeildChange(e, index, feilds?.key)
                            }
                            // maxLength={LettersRegex}
                            //multiLine
                            //isRequired
                          />
                        </Grid>
                      )}

                      {feilds?.type == "dropdown-fix" && (
                        <Grid item md={feilds?.cols} sx={{ mb: 1 }}>
                          <Dropdown
                            label={feilds?.title}
                            dataSet={feilds?.value}
                            getOptionLabel="value"
                            name={feilds?.key}
                            selectedValue={feilds}
                            getOptionValue="key"
                            onChange={(e) =>
                              handleFormFeildChange(e, index, feilds?.key)
                            }
                            isRequired
                          />
                        </Grid>
                      )}
                      {feilds?.type == "text" && (
                        <Grid item md={feilds?.cols} sx={{ mb: 1 }}>
                          <InputTextField
                            label={feilds?.title}
                            onChange={(e) =>
                              handleFormFeildChange(e, index, feilds?.key)
                            }
                            // maxLength={LettersRegex}
                            //multiLine
                            //isRequired
                          />
                        </Grid>
                      )}
                      {feilds?.type == "radio" && (
                        <Grid item md={feilds?.cols} sx={{ mb: 1 }}>
                          <CommonRadioGroup
                            label={feilds?.title}
                            dataSet={feilds?.value}
                            //selectedValue={feilds?.key}
                            onChange={(e) =>
                              handleFormFeildChange(e, index, feilds?.key)
                            }
                            name={feilds?.key}
                            row
                            isRequired
                          />
                        </Grid>
                      )}
                      {feilds?.type == "checkbox" && (
                        <Grid item md={feilds?.cols} sx={{ mb: 1 }}>
                          <CommonCheckboxGroup
                            label={feilds?.title}
                            dataSet={feilds?.value}
                            selectedValue={feilds?.key}
                            onChange={(e) =>
                              handleFormFeildChange(e, index, feilds?.key)
                            }
                            name={feilds?.key}
                            row
                            isRequired
                          />
                        </Grid>
                      )}
                    </>
                  );
                })}
              </Grid>
  );
};

export default Form;
