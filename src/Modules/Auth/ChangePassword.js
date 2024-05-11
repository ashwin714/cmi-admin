import React, { useState, useEffect } from "react";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  Card,
} from "@mui/material";
import { grid } from "@mui/system";
import CommonLabel from "../../Component/CommonLabel/CommonLabel";
import { NavLink, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useSelector, useDispatch } from "react-redux";
import {
  AuthData,
  GetSendOtp,
  SetNewPinPassword,
  SetPinPasswordOtp,
} from "./features/AuthSlice";
import { EmployeeData, GetUserProfileData } from "../Employee/EmployeeSlice";

var md5 = require("md5");

const ChangePassword = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const loggedInData = useSelector(AuthData)?.loginData;
  // const otpData = useSelector(AuthData)?.sendOtpData;
  // const setPinPasswordSuccess=useSelector(AuthData)?.setPinPassword;
  const employeeDetails = useSelector(EmployeeData)?.getUserProfile;

  const [mobile, setMobile] = useState("");
  const [oldPinPassword, setOldPinPassword] = useState("");
  const [newPinPassword, setNewPinPassword] = useState("");
  const [confirmPinPassword, setConfirmPinPassword] = useState("");

  const handleNewPinPaasord = (e) => setNewPinPassword(e.target.value);
  const handleOldPinPaasord = (e) => setOldPinPassword(e.target.value);
  const handleConfirmPinPassword = (e) => setConfirmPinPassword(e.target.value);
  useEffect(() => {
    dispatch(GetUserProfileData());
  }, []);

  const handleNewPin = () => {
    var data = {
      mobile: employeeDetails?.mobile,
      pin: newPinPassword,
      oldPin: oldPinPassword,
    };
    dispatch(SetPinPasswordOtp(data));
  };

  return (
    <>
      <Typography className="pageHeader">Change Password</Typography>
      <Card sx={{ m: 1, p: 2 }}>
        <div style={{ width: "300px" }}>
          <div className="textAlignCenter">
            <div className="inputpadding" style={{ marginTop: "10px" }}>
              <TextField
                type="text"
                id="outlined"
                label="Old pin password"
                className="hauto"
                size="small"
                //inputProps={{ pattern: regex ? regex : regEx , maxLength: maxLength, minLength:minLength }}
                variant="outlined"
                maxLenght={10}
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 4,
                  pattern: "^[6789]{1}[0-9]{9}$",
                  autoComplete: "new-password",
                }}
                onChange={handleOldPinPaasord}
                value={oldPinPassword}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="inputpadding" style={{ marginTop: "10px" }}>
              <TextField
                type="text"
                id="outlined"
                label="New pin password"
                className="hauto"
                size="small"
                //inputProps={{ pattern: regex ? regex : regEx , maxLength: maxLength, minLength:minLength }}
                variant="outlined"
                maxLenght={10}
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 4,
                  pattern: "^[6789]{1}[0-9]{9}$",
                  autoComplete: "new-password",
                }}
                onChange={handleNewPinPaasord}
                value={newPinPassword}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="inputpadding" style={{ marginTop: "10px" }}>
              <TextField
                type="text"
                id="outlined"
                label="Confirm pin password"
                className="hauto"
                size="small"
                //inputProps={{ pattern: regex ? regex : regEx , maxLength: maxLength, minLength:minLength }}
                variant="outlined"
                maxLenght={10}
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 4,
                  pattern: "^[6789]{1}[0-9]{9}$",
                  autoComplete: "new-password",
                }}
                onChange={handleConfirmPinPassword}
                value={confirmPinPassword}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div className="inputpadding" style={{ textAlign: "right" }}>
              <a href="/admin/changePasswordOtp" style={{ color: "#1976d2" }}>
                Show another way
              </a>
            </div>
            <Button
              variant="contained"
              className="border-button"
              // disabled={!isValid}
              color="primary"
              onClick={handleNewPin}
              sx={{ mt: 1, mx: "auto", borderRadius: "10px", width: "100%" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ChangePassword;
