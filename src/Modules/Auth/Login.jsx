import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { useSelector, useDispatch } from "react-redux";
import { AuthData, GetLogin, GetSendOtp } from "./features/AuthSlice";

var md5 = require("md5");

const Login = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInData = useSelector(AuthData)?.loginData;
  const otpData = useSelector(AuthData)?.sendOtpData;

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("projectId");
    localStorage.removeItem("employeeId");
    localStorage.removeItem("appRight");
    localStorage.removeItem("userDetail");
    sessionStorage.removeItem("isSession");
  }, []);
  // useEffect(() => {

  //   if(emailId != "" && password != ""){
  //     setIsValid(true);
  //   }else{
  //     setIsValid(false);
  //   }
  // }, [emailId, password]);

  useEffect(() => {
    if (loggedInData !== undefined) {
      if (loggedInData) {
        window.location.assign("/cmi");
      } else {
        window.location.assign("/");
      }
    }
  }, [loggedInData]);

  const handleMobile = (e) => setMobile(e.target.value);
  const handleOTP = (e) => setOtp(e.target.value);
  const handleSignIn = () => {
    //window.location.assign("/admin/product");
    const obj = {
      username: mobile,
      password: otp,
    };
    dispatch(GetLogin(obj));
  };
  const handleOtp = () => {
    const obj = {
      mobile: mobile,
    };
    dispatch(GetSendOtp(obj));
  };
  const handleOtpKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };
  const handleMobileKeyDown = (event) => {
    if (event.key === "Enter") {
      handleOtp();
    }
  };
  return (
    <div style={{ width: "300px" }}>
      <div className="textAlignCenter">
        <h1 style={{ marginTop: "0px" }}>Sign In</h1>
      </div>
      <div className="inputpadding">
        <TextField
          type="text"
          id="outlined"
          label="Email / Phone No."
          className="hauto"
          size="small"
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
          style={{ width: "100%" }}
        />
      </div>
      <div className="inputpadding">
        <TextField
          type="text"
          id="outlined"
          label="M-Pin"
          size="small"
          className="hauto"
          variant="outlined"
          onChange={handleOTP}
          onKeyDown={handleOtpKeyDown}
          value={otp}
          sx={{ mt: 3 }}
          style={{ width: "100%" }}
        />
      </div>
      {/* <div className="inputpadding" style={{ textAlign: "right" }}>
        <a href="/forgot" style={{ color: "#1976d2" }}>
          Forgot pin password ?
        </a>
      </div>
      <br /> */}
      <div className="textAlignCenter">
        <Button
          variant="contained"
          className="border-button"
          // disabled={!isValid}
          color="primary"
          onClick={handleSignIn}
          sx={{ mt: 3, mx: "auto", width: "100%" }}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
