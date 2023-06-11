import { Box, Link, Typography, useTheme } from "@mui/material";
import React from "react";
import Widget from "./widget";
import adsThumb from "../../assets/img/adsThumb.jpg";
// import adsPicture from "../../assets/img/adsPicture.jpg";

const Ads = () => {
  const theme = useTheme();
  return (
    <Widget sx={{position:'sticky',top:'6rem'}}>
      <Typography variant="h5" fontWeight={"600"} fontSize={"1.2rem"}>
        Sponsored
      </Typography>
      <Box component={"img"} src={adsThumb} width={"100%"} margin="1rem 0 " />
      <Box display="flex" justifyContent="space-between" alignItems='center'>
        <Typography component='h5' color={theme.palette.neutral.main}>Royal Toys</Typography>
        <Link
          color={theme.palette.neutral.medium}
          href="http://royaltoys.com.vn"
          target="_blank"
          rel="noopener"
          sx={{ textDecoration: "none", fontSize: ".8rem" }}
        >
          royaltoys.com.vn
        </Link>
      </Box>
    </Widget>
  );
};

export default Ads;
