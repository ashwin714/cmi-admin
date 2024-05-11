import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { Button, Card, Dialog, DialogActions, Grid } from "@mui/material";
import { ModalHeader } from "../Modal/ModalHeader";
import { ModalBody } from "../Modal/ModalBody";
import { ModalFooter } from "../Modal/ModalFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProjectUnitDetails,
  ProjectData,
} from "../../Modules/Project/ProjectSlice";
import SubUnit from "../../Modules/Project/SubUnit";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
        // </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({
  data,
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
  var currentId = data?.wings?.values()?.next()?.value?.id;
  useEffect(() => {
    setWingId(currentId);
    // console.log(projectId, "wingsInfowingsInfo");
  }, [currentId]);

  const handleTabClick = (item) => {
    setWingId(item?.id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUnit = (item) => {
    setOpen(true);
    // console.log(item);
    dispatch(GetProjectUnitDetails({ projectId: projectId, unitId: item.id }));
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        mt: 0,
      }}
    >
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {data?.wings?.map((item, index) => {
          return (
            <Tab
              label={`Wing ` + item.name}
              onClick={() => handleTabClick(item)}
              {...a11yProps(index)}
            />
          );
        })}
      </Tabs>
      {data?.wings?.map((item, index) => {
        return (
          <TabPanel
            value={value}
            index={index}
            style={{ width: "100%", padding: "10px" }}
          >
            <Grid container spacing={0}>
              {wingsInfo?.flats?.length != 0 ? (
                <Grid item sm={12}>
                  <Typography> Flats</Typography>
                  <hr />
                </Grid>
              ) : null}
              {wingsInfo?.flats?.map((flats) => {
                return (
                  <div style={{width:"100%", display:'flex'}}>
                      {flats?.value?.map((flatItem) => {
                        return (
                          <div style={{width:`${100/flats?.value?.length}`+'%', float:'left',display: 'inline-block',
                                margin: '5px'}}>
                           <Card
                                    key={flatItem?.id}
                                    onClick={() => handleUnit(flatItem)}
                                    style={{
                                      textAlign: "center",
                                      height:`${flatItem?.type=='REFUGEE'?"28px":"auto"}`,
                                      cursor: "pointer",
                                      fontSize: "12px",
                                      padding: "5px",
                                      background: `#${flatItem?.colorCode}`,
                                    }}
                                    //sx={{ p: 1 }}
                                  >
                                    <Typography style={{ fontSize: "12px" }}>
                                      {" "}
                                      {flatItem?.type=='REFUGEE'?"":flatItem?.unitNo}
                                    </Typography>
                                  </Card>
                          </div>
                        );
                      })}
                    </div>
                );
              })}
            </Grid>
            <Grid container spacing={0} sx={{ mt: 2 }}>
              {wingsInfo?.shops?.length != 0 ? (
                <Grid item sm={12}>
                  <Typography> Shops</Typography>
                  <hr />
                </Grid>
              ) : null}
              {wingsInfo?.shops?.map((flats) => {
                return (
                  <div style={{width:"100%", display:'flex'}}>
                      {flats?.value?.map((flatItem) => {
                        return (
                          <div style={{width:`${100/flats?.value?.length}`+'%', float:'left',display: 'inline-block',
                                margin: '5px'}}>
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
                                {flatItem?.unitNo}
                              </Typography>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                );
              })}
            </Grid>
            <Grid container spacing={0} sx={{ mt: 2 }}>
            {wingsInfo?.parking?.length !== 0 ? (
                <Grid item sm={12}>
                  <Typography> Parking</Typography>
                  <hr />
                </Grid>
              ) : null}
              {wingsInfo?.parking?.map((flats) => {
              
                return (
                  <div style={{width:"100%", display:'flex'}}>
                      <>

                        {flats?.value?.map((flatItem) => {
                          return (
                            <>
                              {flatItem?.subValue?.length == 1 &&
                                <>
                                  {flatItem?.subValue?.map((subParking) => {
                                    return (
                                      <SubUnit parkingItem={subParking} handleParkingDetails={handleUnit} flats={flatItem?.subValue}/>
                                    )
                                  })}

                                </>
                              }
                              {flatItem?.unitNo != "" &&
                                <div style={{width:`${100/flats?.value?.length}`+'%', float:'left',display: 'inline-block',
                                margin: '5px'}}>
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
          </TabPanel>
        );
      })}
      <Dialog
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "400px", // Set your width here
            },
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
                  <Grid container spacing={1}>
                    <Grid sm={12} item>
                      Unit Cost
                      <hr />
                    </Grid>
                    <Grid sm={6} item>
                      Basic Cost :
                    </Grid>
                    <Grid sm={6} item>
                      {projectUnitDetails?.unit_cost?.basicCost}
                    </Grid>
                    <Grid sm={6} item>
                      Stamp Duty :
                    </Grid>
                    <Grid sm={6} item>
                      {projectUnitDetails?.unit_cost?.stampDuty}
                    </Grid>
                    <Grid sm={6} item>
                      Registration :
                    </Grid>
                    <Grid sm={6} item>
                      {projectUnitDetails?.unit_cost?.registration}
                    </Grid>
                    <Grid sm={6} item>
                      GST :
                    </Grid>
                    <Grid sm={6} item>
                      {projectUnitDetails?.unit_cost?.GST}
                    </Grid>
                    <Grid sm={6} item>
                      Legal :
                    </Grid>
                    <Grid sm={6} item>
                      {projectUnitDetails?.unit_cost?.legal}
                    </Grid>
                    <Grid sm={6} item>
                      Total :
                    </Grid>
                    <Grid sm={6} item>
                      {projectUnitDetails?.unit_cost?.total}
                    </Grid>
                  </Grid>
                </Card>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid sm={6} item>
                    Min Customer Contribution
                  </Grid>
                  <Grid sm={6} item>
                    {projectUnitDetails?.min_contribution}
                  </Grid>
                  <Grid sm={6} item>
                    Loan Applicable
                  </Grid>
                  <Grid sm={6} item>
                    {projectUnitDetails?.loan_applicable}
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid sm={12} item>
                    <table border="1px" width="100%">
                      <thead>
                        <th></th>
                        <th>If PMAY</th>
                        <th>If NOT</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Subsidiary</td>
                          <td>{projectUnitDetails?.pmay?.subsidary}</td>
                          <td>{projectUnitDetails?.non_pmay?.subsidary}</td>
                        </tr>
                        <tr>
                          <td>Net Loan Amt</td>
                          <td>{projectUnitDetails?.pmay?.net_loan}</td>
                          <td>{projectUnitDetails?.non_pmay?.net_loan}</td>
                        </tr>
                        <tr>
                          <td>Approx EMI</td>
                          <td>{projectUnitDetails?.pmay?.emi}</td>
                          <td>{projectUnitDetails?.non_pmay?.emi}</td>
                        </tr>
                      </tbody>
                    </table>
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
      </Dialog>
    </Box>
  );
}
