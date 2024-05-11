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
import { clearLocalStorage } from "../../Features/CommonFunction/LocalStorage";
import ToastAlert from "../../Component/Alert/ToastAlert";
//import { GetLogin, AuthData } from "../features/userAuth/UserAuthSlice";
//import { clearLocalStorage } from "../../../features/CommonFunction/LocalStorage";

var md5 = require("md5");

const ChangePasswordOtp = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const loggedInData = useSelector(AuthData)?.loginData;
  const otpData = useSelector(AuthData)?.sendOtpData;
  //const setPinPasswordSuccess=useSelector(AuthData)?.setPinPasswordOtp;

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [newPinPassword, setNewPinPassword] = useState("");
  const [confirmPinPassword, setConfirmPinPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleMobile = (e) => setMobile(e.target.value);
  const handleOTP = (e) => setOtp(e.target.value);
  const handleNewPinPaasord = (e) => setNewPinPassword(e.target.value);
  const handleConfirmPinPassword = (e) => setConfirmPinPassword(e.target.value);
  const handleOtpVerify = () => {
    if (otpData == otp) {
      setShowPin(true);
    } else {
      ToastAlert("Otp not match !", "success");
    }
  };
  const handleOtp = () => {
    const obj = {
      mobile: mobile,
    };
    dispatch(GetSendOtp(obj));
  };
  const handleNewPin = () => {
    var data = {
      mobile: mobile,
      pin: newPinPassword,
    };
    dispatch(SetPinPasswordOtp(data));
  };
  const handleCancel = () => {
    window.location.reload();
  };
  const handleOtpKeyDown = (event) => {
    if (event.key === "Enter") {
      handleOtpVerify();
    }
  };
  const handleMobileKeyDown = (event) => {
    if (event.key === "Enter") {
      handleOtp();
    }
  };
  return (
    <>
      <Typography className="pageHeader">Change Password</Typography>
      <Card sx={{ m: 1, p: 2 }}>
        <div style={{ width: "300px" }}>
          {/* <div className="textAlignCenter">
        <h1 style={{ marginTop: "0px" }}>Sign In</h1>
      </div> */}
          <div className="textAlignCenter">
            {/* Great! Enter your email and password below to sign in, or */}
            {/* <NavLink to={`/createaccount`}>Create an account</NavLink>  */}
          </div>
          {/* <br />
      <div>
        <span style={{ color: "red" }}>*</span>Indicates required fields.
      </div> */}
          {showPin == false && (
            <>
              {otpData == undefined ? (
                <div className="inputpadding">
                  {/* <label>
            <CommonLabel label="Mobile" mandatory />
          </label> */}
                  <TextField
                    type="text"
                    id="outlined"
                    label="Mobile"
                    className="hauto"
                    size="small"
                    //inputProps={{ pattern: regex ? regex : regEx , maxLength: maxLength, minLength:minLength }}
                    variant="outlined"
                    maxLenght={10}
                    inputProps={{
                      inputMode: "numeric",
                      maxLength: 10,
                      pattern: "^[6789]{1}[0-9]{9}$",
                      autoComplete: "new-password",
                    }}
                    onChange={handleMobile}
                    onKeyDown={handleMobileKeyDown}
                    value={mobile}
                    required
                    style={{ width: "100%" }}
                  />
                </div>
              ) : (
                <div className="inputpadding">
                  {/* <label>
            <CommonLabel label="Otp" mandatory />
          </label> */}
                  <TextField
                    type="text"
                    id="outlined"
                    label="Otp"
                    size="small"
                    //   label="Password"
                    className="hauto"
                    variant="outlined"
                    onChange={handleOTP}
                    onKeyDown={handleOtpKeyDown}
                    value={otp}
                    style={{ width: "100%" }}
                    required
                  />
                </div>
              )}
            </>
          )}
          <br />
          {showPin == false && (
            <div className="textAlignCenter">
              {otpData == undefined ? (
                <>
                  <Button
                    variant="contained"
                    // disabled={!isValid}
                    className="background-button"
                    color="primary"
                    onClick={handleOtp}
                    sx={{
                      mt: 1,
                      mx: "auto",
                      borderRadius: "20px",
                      width: "100%",
                    }}
                  >
                    Get OTP
                  </Button>
                  {/* <Button
            variant="contained"
            // disabled={!isValid}
            color="primary"
            href={`/createaccount`}
            className="background-button"
            sx={{ mt: 1, mx: "auto", borderRadius: "20px", width: "100%" }}
          >
            Sign Up
          </Button> */}
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    className="border-button"
                    // disabled={!isValid}
                    color="primary"
                    onClick={handleOtpVerify}
                    sx={{
                      mt: 1,
                      mx: "auto",
                      borderRadius: "20px",
                      width: "100%",
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    className="background-button"
                    color="primary"
                    onClick={handleCancel}
                    sx={{
                      mt: 1,
                      mx: "auto",
                      borderRadius: "20px",
                      width: "100%",
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          )}
          {showPin && (
            <>
              {/* <div className="inputpadding">
         
         <TextField
           type="text"
           id="outlined"
           label="Old pin password"
           className="hauto"
           size="small"
           //inputProps={{ pattern: regex ? regex : regEx , maxLength: maxLength, minLength:minLength }}
           variant="outlined"
           maxLenght={10}
           inputProps={{ inputMode: "numeric", maxLength:4, pattern: "^[6789]{1}[0-9]{9}$",autoComplete: 'new-password' }}
           onChange={handleNewPinPaasord}
           value={newPinPassword}
           required
           style={{ width: "100%" }}
         />
       </div> */}
              <div className="inputpadding">
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
              <div className="inputpadding" style={{ marginTop: "20px" }}>
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
              <Button
                variant="contained"
                className="border-button"
                // disabled={!isValid}
                color="primary"
                onClick={handleNewPin}
                sx={{ mt: 1, mx: "auto", borderRadius: "20px", width: "100%" }}
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export default ChangePasswordOtp;
