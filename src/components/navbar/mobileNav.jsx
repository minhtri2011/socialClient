import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
const MobileNav = ({ isMobile, toggleDrawer, isOpen }) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen && isMobile}
      onClose={toggleDrawer(false)}
    >
      <List>
        {/* Các mục điều hướng trong menu */}
        <ListItem
          component="a"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText primary="Facebook" />
        </ListItem>
        <ListItem
          component="a"
          href="https://twitter.com/"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>
        <ListItem
          component="a"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText primary="Instagram" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MobileNav