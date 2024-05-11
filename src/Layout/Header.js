import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../Assets/Images/logo.png";
import { Avatar } from "@mui/material";
import { pink } from "@mui/material/colors";
import { clearLocalStorage } from "../Features/CommonFunction/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const pages = [
  // {'name': 'Dashboard', 'href':'/user'},
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const dispatch = useDispatch();
  // const userDetails = useSelector(EmployeeData)?.getUserProfile;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const userDetailsJson = localStorage.getItem("userDetail");
  const userDetails = JSON.parse(userDetailsJson);

  const [profilePhote, setProfilePhoto] = useState();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    clearLocalStorage();
  };
  // useEffect(() => {
  //   dispatch(GetUserProfileData());
  // }, [])

  // useEffect(() => {
  //   if (userDetails) {
  //     userDetails?.documents?.map((item) => {
  //       if (item?.dtype == "profilePic") {
  //         return setProfilePhoto(item?.url)
  //       }
  //     })
  //   }
  // }, [userDetails])
  return (
    <AppBar position="fixed" className="headerBackground">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography

          >
            <img className='logoimg' src={Logo} style={{ height: "60px" }} />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admin"
            sx={{
              ml: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#0171a3",
              textDecoration: "none",
              fontFamily: "inherit",
              letterSpacing:"0rem"
            }}>Chetak Mediplast Industry</Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" href={page.href}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
           Chetak Mediplast Industry
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                href={page.href}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userDetails?.profilePic ?
                  <Avatar sx={{ bgcolor: "#0171a3" }} aria-label="recipe">
                    <img src={userDetails?.profilePic} alt="Profile-Phot" style={{ width: "40px", height: "40px" }} />
                  </Avatar> :
                  <Avatar sx={{ bgcolor: "#0171a3" }} aria-label="recipe">
                    {userDetails?.user?.charAt(0)}
                  </Avatar>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( */}
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/admin/profile"> <Typography textAlign="center">Profile</Typography></NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to='/admin/changePassword' textAlign="center">Change Password</NavLink >
              </MenuItem> */}
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              {/* ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
