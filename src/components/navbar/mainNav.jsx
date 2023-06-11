import Brightness4Icon from "@mui/icons-material/Brightness4";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { changeTheme } from "../../redux/slice/themeSlice";
import { Link } from "react-router-dom";

const MainNav = ({ isMobile, toggleDrawer }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
  const changedThemeMode = () => {
    dispatch(changeTheme());
  };
  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.alt,
        position: "fixed",
        top: 0,
      }}
    >
      <Toolbar>
        <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
          <Typography
            color={theme.palette.neutral.main}
            fontWeight={600}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Social Web
          </Typography>
        </Box>

        {/* Search tool to find user  */}
        {/* <SearchTool /> */}
        {/* </Box> */}
        <Box sx={{ flexGrow: 1 }} />

        {/* enable menu button when view on mobile  */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* hide tool when view mobile screen  */}
        {!isMobile && (
          <Box
            sx={{ "&>*": { marginLeft: "10px !important", cursor: "pointer" } }}
          >
            <Brightness4Icon onClick={changedThemeMode} />
            <Link to={"/message"}>
              <EmailIcon
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              target="_blank"
              rel="noopener"
            >
              <NotificationsIcon
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            </Link>
            <LogoutIcon
              onClick={logoutUser}
              sx={{
                color: theme.palette.text.primary,
              }}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
