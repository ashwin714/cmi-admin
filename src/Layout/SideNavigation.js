import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ShoppingCart,
} from "@mui/icons-material";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

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
  ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(Drawer, {
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

const menuItems = [
  { label: "Products", path: "/cmi", icon: <CategoryTwoToneIcon /> },
  { label: "Orders", path: "/cmi/order", icon: <ShoppingCart /> },
];

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("/cmi");

  useEffect(() => {
    const path =
      "/" + window.location.pathname.split("/", 3).filter(Boolean).join("/");
    if (path === "/cmi/orderDetails") {
      setActiveMenu("/cmi/order");
    } else if (path === "/cmi/productDetails") {
      setActiveMenu("/cmi");
    } else {
      setActiveMenu(path);
    }
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", mt: "64px" }}>
      <CssBaseline />
      <CustomDrawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Box sx={{ px: 2, fontWeight: "bold", fontSize: "1rem" }}>Menu</Box>
          )}
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => setActiveMenu(item.path)}
            >
              <ListItemButton
                selected={activeMenu === item.path}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 1,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </CustomDrawer>
    </Box>
  );
}
