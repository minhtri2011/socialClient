import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import logo from "../assets/img/logo.png";
import UserChatButtons from "./userChatButtons";

const SideBar = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={12}
      square
      sx={{
        height: "100%",
        padding: "10px",
      }}
    >
      {/* logo */}
      <Typography color={"red"} fontSize={"2rem"} fontWeight={"bold"}>
        Wibu chat
      </Typography>

      {/* list user btn  */}
      <UserChatButtons />
    </Paper>
  );
};

export default SideBar;
