import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import VerticalTabs from "./VerticalTabs";
import {
  GetProjectUnitDetails,
  ProjectData,
} from "../../Modules/Project/ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { ModalHeader } from "../Modal/ModalHeader";
import { ModalBody } from "../Modal/ModalBody";
import { ModalFooter } from "../Modal/ModalFooter";
import SubUnit from "../../Modules/Project/SubUnit";

export default function LabTabs({
  data,
  setBuildingId,
  projectWings,
  setWingId,
  wingsInfo,
  buildingId,
  projectId,
}) {
  const dispatch = useDispatch();
  const projectUnitDetails = useSelector(ProjectData)?.getUnitDetailsData;

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  var currentId = data?.values()?.next()?.value?.id;
  useEffect(() => {
    setBuildingId(currentId);
    //console.log(projectWings?.parking?.length, "projectWings?.parking?.length");
  }, [currentId]);

  const handleBuldingClick = (item) => {
    setBuildingId(item?.id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUnit = (item) => {
    if (item?.type !== "REFUGEE") {
      setOpen(true);
      dispatch(GetProjectUnitDetails({ projectId: projectId, unitId: item.id }));
    }
  };
  return (
    <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {data?.map((building, index) => {
              return (
                <Tab
                  key={index + 1}
                  label={building?.name}
                  onClick={() => handleBuldingClick(building)}
                  value={index}
                />
              );
            })}
          </TabList>
        </Box>
        {data?.map((building, index) => {
          return (
            <TabPanel value={index} key={index + 1}>
              {projectWings?.wings?.length > 0 ? (
                <VerticalTabs
                  data={projectWings}
                  setWingId={setWingId}
                  wingsInfo={wingsInfo}
                  buildingId={buildingId}
                  projectId={projectId}
                />
              ) : (
                <>
                  <Grid container spacing={1}>
                    {projectWings?.flats?.length != 0 ? (
                      <Grid item sm={12}>
                        <Typography> Flats</Typography>
                        <hr />
                      </Grid>
                    ) : null}
                    {projectWings?.flats?.map((flats) => {
                      return (

                        <div style={{ width: "100%", display: 'flex' }}>
                          {flats?.value?.map((flatItem) => {

                            return (
                              <div style={{
                                width: `${100 / flats?.value?.length}` + '%', float: 'left', display: 'inline-block',
                                margin: '5px'
                              }}>
                                <Card
                                  key={flatItem?.id}
                                  onClick={() => handleUnit(flatItem)}
                                  style={{
                                    textAlign: "center",
                                    height: `${flatItem?.type == 'REFUGEE' ? "28px" : "auto"}`,
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    padding: "5px",
                                    background: `#${flatItem?.colorCode}`,
                                  }}
                                //sx={{ p: 1 }}
                                >
                                  <Typography style={{ fontSize: "12px" }}>
                                    {" "}
                                    {flatItem?.type == 'REFUGEE' ? "" : flatItem?.unitNo}
                                  </Typography>
                                </Card>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {projectWings?.shops?.length != 0 ? (
                      <Grid item sm={12}>
                        <Typography> Shops</Typography>
                        <hr />
                      </Grid>
                    ) : null}
                    {projectWings?.shops?.map((flats) => {
                      return (
                        <div style={{ width: "100%", display: 'flex' }}>
                          {flats?.value?.map((flatItem) => {
                            return (
                              <div style={{
                                width: `${100 / flats?.value?.length}` + '%', float: 'left', display: 'inline-block',
                                margin: '5px'
                              }}>
                                <Card
                                  key={flatItem?.id}
                                  onClick={() => handleUnit(flatItem)}
                                  style={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    padding: "5px",
                                    background: `#${flatItem?.colorCode}`,
                                  }}
                                //sx={{ p: 1 }}
                                >
                                  <Typography style={{ fontSize: "12px" }}>
                                    {" "}
                                    {flatItem?.unitNo}
                                  </Typography>
                                </Card>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {projectWings?.parking?.length !== 0 ? (
                      <Grid item sm={12}>
                        <Typography> Parking</Typography>
                        <hr />
                      </Grid>
                    ) : null}
                    {projectWings?.parking?.map((flats) => {

                      return (
                        <div style={{ width: "100%", display: 'flex' }}>
                          <>

                            {flats?.value?.map((flatItem) => {
                              return (
                                <>
                                  {flatItem?.subValue?.length == 1 &&
                                    <>
                                      {flatItem?.subValue?.map((subParking) => {
                                        return (
                                          <SubUnit parkingItem={subParking} handleParkingDetails={handleUnit} flats={flatItem?.subValue} />
                                        )
                                      })}

                                    </>
                                  }
                                  {flatItem?.unitNo != "" &&
                                    <div style={{
                                      width: `${100 / flats?.value?.length}` + '%', float: 'left', display: 'inline-block',
                                      margin: '5px'
                                    }}>
                                      <Card
                                        key={flatItem?.id}
                                        onClick={() =>
                                          handleUnit(flatItem)
                                        }
                                        style={{
                                          textAlign: "center",
                                          cursor: "pointer",
                                          fontSize: "12px",
                                          padding: "5px",
                                          background: `#${flatItem?.colorCode}`,
                                        }}
                                      //sx={{ p: 1 }}
                                      >
                                        <Typography style={{ fontSize: "12px" }}>

                                          {flatItem?.unitNo}
                                        </Typography>
                                      </Card>
                                    </div>
                                  }
                                </>
                              );
                            })}
                          </>
                        </div>

                      );
                    })}
                  </Grid>
                </>
              )}
            </TabPanel>
          );
        })}
      </TabContext>
      <Dialog
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            width: "100%",
            // justifyContent: "left",
            // maxWidth: "400px", // Set your width here

          },
        }}
      >
        <Box>
          <ModalHeader
            title={projectUnitDetails?.building_name}
            subTitle={projectUnitDetails?.unit_type}
            onClose={handleClose}
          />
          <ModalBody
            style={{ padding: "0px" }}
            contents={
              <>
                <Card sx={{ p: 1 }}>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    {projectUnitDetails?.areas?.map((area) => {
                      return (
                        <>
                          <Grid sm={3} item>
                            {area.key}
                          </Grid>
                          <Grid sm={3} item>
                            {area.value}
                          </Grid>
                        </>
                      )
                    })}

                    <Grid sm={3} item>
                      Sell Rate
                    </Grid>
                    <Grid sm={3} item>
                      Rs. {projectUnitDetails?.sell_rate} /-
                    </Grid>

                  </Grid>
                </Card>
                <Card sx={{ p: 1, mt: 1 }}>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid sm={12} item>
                      Unit Cost
                      <hr />
                    </Grid>
                    <Grid sm={3} item>
                      Basic Cost :
                    </Grid>
                    <Grid sm={3} item>
                      Rs. {projectUnitDetails?.unit_cost?.basicCost}/-
                    </Grid>
                    <Grid sm={3} item>
                      Stamp Duty :
                    </Grid>
                    <Grid sm={3} item>
                      Rs. {projectUnitDetails?.unit_cost?.stampDuty}/-
                    </Grid>
                    <Grid sm={3} item>
                      Registration :
                    </Grid>
                    <Grid sm={3} item>
                      Rs. {projectUnitDetails?.unit_cost?.registration}/-
                    </Grid>
                    <Grid sm={3} item>
                      GST :
                    </Grid>
                    <Grid sm={3} item>
                      Rs. {projectUnitDetails?.unit_cost?.GST}/-
                    </Grid>
                    <Grid sm={3} item>
                      Legal :
                    </Grid>
                    <Grid sm={3} item>
                      Rs. {projectUnitDetails?.unit_cost?.legal} /-
                    </Grid>
                    <Grid sm={3} item>
                      Total :
                    </Grid>
                    <Grid sm={3} item>
                      Rs. {projectUnitDetails?.unit_cost?.total} /-
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ p: 1, mt: 1 }}>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid sm={3} item>
                      Min Customer Contribution
                    </Grid>
                    <Grid sm={3} item>
                      {projectUnitDetails?.min_contribution}
                    </Grid>
                    <Grid sm={3} item>
                      Loan Applicable
                    </Grid>
                    <Grid sm={3} item>
                      {projectUnitDetails?.loan_applicable}
                    </Grid>
                  </Grid>
                </Card>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid sm={12} item>
                    <Table width="100%" className="tableCenter">
                      <TableHead>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">If PMAY</TableCell>
                        <TableCell align="center">If NOT</TableCell>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">Subsidiary</TableCell>
                          <TableCell align="center">{projectUnitDetails?.pmay?.subsidary}</TableCell>
                          <TableCell align="center">{projectUnitDetails?.non_pmay?.subsidary}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Net Loan Amt</TableCell>
                          <TableCell align="center">{projectUnitDetails?.pmay?.net_loan}</TableCell>
                          <TableCell align="center">{projectUnitDetails?.non_pmay?.net_loan}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Approx EMI</TableCell>
                          <TableCell align="center">{projectUnitDetails?.pmay?.emi}</TableCell>
                          <TableCell align="center">{projectUnitDetails?.non_pmay?.emi}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid
                    sm={12}
                    item
                    dangerouslySetInnerHTML={{
                      __html: projectUnitDetails?.note,
                    }}
                  ></Grid>
                </Grid>
              </>
            }
          />
          <DialogActions>
            <Button type="button" onClick={handleClose} variant="contained" className="background-button">
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog >
    </Box >
  );
}
