import React from "react";
import { Outlet } from "react-router-dom";
import { Paper, Grid, Box, Typography } from "@mui/material";
import Logo from "../Assets/Images/logo.png"
import bg from "../Assets/Images/bg.jpg"
import {ToastContainer} from "react-toastify";

const AuthLayout = () => {
  return (
    <div className="bg_img" style={{  
      backgroundImage: "url(" + bg + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
    <Grid
      container
      direction="row"
      justifyContent="center"
      style={{ height: "100vh"}}
    >
       <ToastContainer />
      <Grid item style={{maxWidth:"410px"}} alignSelf="center">
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "block" }, textAlign: "center", mt: 0 }}
        >
          
        </Typography>
        <Paper style={{ marginTop: "12px", marginBottom: "24px" }}>
          <Box sx={{ p: 3 }} style={{textAlign:"center"}}>
          <img className="logoimg" src={Logo} />
            <Outlet />
          </Box>
        </Paper>
      </Grid>
    </Grid>
    </div>
  );
};

export default AuthLayout;
