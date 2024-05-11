import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import SideNavigation from "../Layout/SideNavigation";
import { Container } from "@mui/material";
const AdminLayout = ({path}) => {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "0px",
      marginTop:"65px",
      width: "100%",
    },
  };
  // const getAccessToken = localStorage.getItem("accessToken");
  // const accessToken = JSON.parse(getAccessToken);
 const loginSeesion = sessionStorage.getItem("isSession");
 const isSession = JSON.parse(loginSeesion);
  return (
    <>
   
       <>
       {isSession===true?
       <>   
        <Header></Header>

        <div style={styles.contentDiv}>
          <SideNavigation></SideNavigation>
          <div style={styles.contentMargin}>
          <Container maxWidth="lg" className="garyBackground" sx={{p:2, pt:1, mt:0}} >
            <Outlet/>       
          </Container>
          </div>
        </div>
        </>:
        (window.location.href = "/")  
      }
        </> 
        
    </>
  );
};

export default AdminLayout;
