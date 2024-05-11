import React, { useState, useEffect } from "react";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Grid,
  MenuItem,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useNavigate } from "react-router-dom";
import { grid } from "@mui/system";
import CommonLabel from "../../Component/CommonLabel/CommonLabel";
import { NavLink } from "react-router-dom";
import "./Auth.css";
import AutoCompleteDropdown from "../../Component/Dropdown/AutoCompleteDropdown";
import { AuthData, GetRegister, GetSendOtp } from "./features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

var md5 = require("md5");

const roleList = [
  { value: "Builder", label: "Builder" },
  { value: "Channel Partner", label: "Channel Partner" },
  { value: "Employee", label: "Employee" },
];
const CreateAccount = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registeredData = useSelector(AuthData)?.registerData;
  const otpData = useSelector(AuthData)?.sendOtpData;

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleEmailId = (e) => setEmailId(e.target.value);
  const handleMobile = (e) => setMobile(e.target.value);
  const handleOTP = (e) => setOtp(e.target.value);

  const [isAPI, setIsAPI] = useState(false);

  useEffect(() => {
    if (registeredData) {
      window.location.assign("/");
    }
  }, [registeredData]);

  const handleOtp = (event) => {
    event.preventDefault();
    const obj = {
      mobile: mobile,
    };
    dispatch(GetSendOtp(obj));
  };
  const handleRegister = (event) => {
    event.preventDefault();
    const obj = {
      name: name,
      email: emailId,
      mobile: mobile,
      role: role,
    };
    dispatch(GetRegister(obj));
  };

  return (
    <Box component="form">
      <div className="textAlignCenter">
        <h1>Create Your Account</h1>
      </div>
      {otpData == undefined ? (
        <>
          <div className="formfield" style={{ textAlign: "left" }}>
            {/* <label>
              <CommonLabel label="Full Name" mandatory />
            </label> */}
            <TextField
              type="text"
              id="outlined"
              label="Full Name"
              size="small"
              variant="outlined"
              className="hauto"
              onChange={handleName}
              value={name}
              // inputProps={{ pattern: LettersRegex}}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div className="formfield" style={{ textAlign: "left" }}>
            {/* <label>
              <CommonLabel label="Email Address" mandatory />
            </label> */}
            <TextField
              type="email"
              id="outlined-basic"
              size="small"
              className="hauto"
              label="Email Address"
              variant="outlined"
              onChange={handleEmailId}
              value={emailId}
              required
              style={{ width: "100%" }}
            />
          </div>

          <div className="formfield" style={{ textAlign: "left" }}>
            {/* <label>
              <CommonLabel label="Mobile Number" mandatory />
            </label> */}
            <TextField
              type="text"
              id="outlined-basic"
              className="hauto"
              size="small"
              variant="outlined"
              onChange={handleMobile}
              inputProps={{
                inputMode: "numeric",
                maxLength: 10,
                pattern: "^[6789]{1}[0-9]{9}$",
              }}
              label="Mobile Number"
              value={mobile}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div className="formfield" style={{ textAlign: "left" }}>
            <AutoCompleteDropdown
              label="Select Role"
              size="small"
              className="hauto"
              dataSet={roleList}
              getOptionLabel="label"
              selectedValue={role}
              getOptionValue="value"
              onChange={setRole}
              isRequired
            />
          </div>
        </>
      ) : (
        <div className="formfield" style={{ textAlign: "left" }}>
          {/* <label>
            <CommonLabel label="Otp" mandatory />
          </label> */}
          <TextField
            type="text"
            size="small"
            id="outlined"
            label="Otp"
            //   label="Password"
            variant="outlined"
            onChange={handleOTP}
            value={otp}
            style={{ width: "100%" }}
            required
          />
        </div>
      )}
      <div className="textAlignCenter">
        {otpData == undefined ? (
          <>
            <Button
              variant="outlined"
              //disabled={!isValid}
              className="border-button"
              onClick={handleOtp}
              type="button"
              sx={{ borderRadius: "25px", width: "100%", mt: 2 }}
            >
              Get Otp
            </Button>
            <Button
              variant="contained"
              className="background-button"
              href="/"
              type="button"
              sx={{ borderRadius: "25px", width: "100%", mt: 2 }}
            >
              Back To Login
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              //disabled={!isValid}
              onClick={handleRegister}
              className="border-button"
              type="button"
              sx={{ borderRadius: "25px", mt: 2 }}
            >
              Create Account
            </Button>
            <Button
              variant="contained"
              href="/createaccount"
              className="background-button"
              type="button"
              sx={{ borderRadius: "25px", width: "100%", mt: 2 }}
            >
              Back To Login
            </Button>
          </>
        )}
      </div>
    </Box>
  );
};

export default CreateAccount;
