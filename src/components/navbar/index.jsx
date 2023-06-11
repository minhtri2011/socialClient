import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import MainNav from "./mainNav";
import MobileNav from "./mobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 720px)");

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  return (
    <>
      <MainNav isMobile={isMobile} toggleDrawer={toggleDrawer} />
      <MobileNav
        isMobile={isMobile}
        toggleDrawer={toggleDrawer}
        isOpen={isOpen}
      />
      <Box marginBottom={'4rem'}></Box>
    </>
  );
};

export default Navbar;
