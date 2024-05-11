import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ToastAlert from "../../../Component/Alert/ToastAlert"
import { Register, Login, SendOtp, ChangePassword, PinPasswordOtp,SetPinPassword } from "./AuthAPI";
// import swal from "sweetalert"; 

const initialState = {
  registerData: undefined,
  loginData: undefined,
  accessToken:undefined,
  sendOtpData: undefined,
  changePasswordData: undefined,
  setPinPasswordOtp:undefined,
  setPinPassword:undefined,
  error: undefined,
  status: "idle"
};

export const GetRegister = createAsyncThunk(
  "authData/Register",
  async (data) => {
    const response = await Register(data);
    return response;
  }
);

export const GetLogin = createAsyncThunk(
  "authData/Login",
  async (data) => {
    const response = await Login(data);
    return response;
  }
);

export const GetSendOtp = createAsyncThunk(
    "authData/SendOtp", 
    async (data) => {
  const response = await SendOtp(data);
  return response;
});

export const SetChangePassword = createAsyncThunk(
  "authData/ChangePassword",
  async (data) => {
    const response = await ChangePassword(data);
    return response;
  }
);
export const SetPinPasswordOtp = createAsyncThunk(
  "authData/SetPinPasswordOtp",
  async (data) => {
    const response = await PinPasswordOtp(data);
    return response;
  }
);
export const SetNewPinPassword = createAsyncThunk(
  "authData/SetNewPinPassword",
  async (data) => {
    const response = await SetPinPassword(data);
    return response;
  }
);


export const AuthDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(GetRegister.fulfilled, (state, action) => {
        state.status = "success";
        state.registerData = action?.payload;
        ToastAlert("Registration completed successfully", "success");
      })

      .addCase(GetLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
        //console.log(action?.error?.message,"action.error")
        //ToastAlert(action?.error?.message, "error");
      })
      .addCase(GetLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.loginData = action?.payload;
        state.accessToken=action?.payload?.jwttoken;
        //console.log(action?.payload?,"login action?.payload?");
        localStorage.setItem("userDetail", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", JSON.stringify(action.payload.jwttoken));
        localStorage.setItem("appRight", JSON.stringify(action.payload.appRight));
        sessionStorage.setItem("isSession", JSON.stringify(true));
        console.log(action.payload,"action.payload")
      })

      .addCase(SetChangePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SetChangePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(SetChangePassword.fulfilled, (state, action) => {
        state.status = "success";
        state.changePasswordData = action?.payload;
      })

      .addCase(GetSendOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetSendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(GetSendOtp.fulfilled, (state, action) => {
        state.status = "success";
        state.sendOtpData = action?.payload;
        ToastAlert(action?.payload, "success");
      })

      .addCase(SetPinPasswordOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SetPinPasswordOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;      
        
      })
      .addCase(SetPinPasswordOtp.fulfilled, (state, action) => {
        state.status = "success";
        state.setPinPasswordOtp = action?.payload;
        ToastAlert("Pin update successfully", "success");
      })

      .addCase(SetNewPinPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SetNewPinPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;      
        
      })
      .addCase(SetNewPinPassword.fulfilled, (state, action) => {
        state.status = "success";
        state.setPinPassword = action?.payload;
        ToastAlert("Pin update successfully", "success");
      });

      
  }
});

export const {} = AuthDataSlice.actions;

export const AuthData = (state) => {
  return state.authData;
};

export const authDataReducer = AuthDataSlice.reducer;
