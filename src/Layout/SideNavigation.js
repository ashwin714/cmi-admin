import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { Apartment, Group , Assessment} from "@mui/icons-material";
import { useState } from "react";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



export default function MiniDrawer() {
  //const userDetails = useSelector(EmployeeData)?.getUserProfile;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = useState(true);
  const [openSubmenu, setOpenSubmenu] = React.useState(false);
  const [activeMenue, setActiveMenu]=useState("/cmi")
  //const userDetailsJson = localStorage.getItem("userDetail");
 // const userDetails = JSON.parse(userDetailsJson);

 var basePath =
 "/" + window.location.pathname.split("/", 3).filter(Boolean).join("/");
//console.log(basePath,"activeMenue");
useEffect(()=>{
 // console.log(basePath,"basePath", basePath==="/cmi/orderDetails")
if(basePath==="/cmi/orderDetails"){
  setActiveMenu("/cmi/order")
}else if(basePath==="/cmi/order"){
  setActiveMenu("/cmi/order")
}
},[basePath])
 const handleMenu=(active)=>{
    setActiveMenu(active)
 }

  return (
    <Box sx={{ display: "flex", marginTop: "50px" }}>
      <CssBaseline />
      <CustomDrawer variant="permanent" open={open}>
        <Divider />
        <List sx={{mt:3}}>
         
                <NavLink
                  disablePadding
                  component="a"
                  sx={{ display: "block" }}
                  to="/cmi"
                  className={activeMenue === "/cmi" ? "activeMenue" : ""}
                  onClick={()=>handleMenu("/cmi")}
                >
                  <ListItemButton>
                    <ListItemIcon><Apartment /></ListItemIcon>
                    <ListItemText primary="Product"/>                   
                  </ListItemButton>
                </NavLink>
                <NavLink
                  disablePadding
                  component="a"
                  sx={{ display: "block" }}
                  to="/cmi/order"
                  className={activeMenue === "/cmi/order" || activeMenue === "/cmi/orderDetails" ? "activeMenue" : ""}
                  onClick={()=>handleMenu("/cmi/order")}
                >
                  <ListItemButton>
                    <ListItemIcon><Assessment /></ListItemIcon>
                    <ListItemText primary="Order"/>                   
                  </ListItemButton>
                </NavLink>
        </List>        
      </CustomDrawer>
    </Box>
  );
}
