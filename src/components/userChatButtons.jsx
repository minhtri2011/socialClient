import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const UserChatButtons = (props) => {
  const {} = props;
  return (
    <Paper
      elevation={1}
      sx={{
        padding: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap:'5px'
      }}
    >
      <Box
        component="img"
        src="https://i.pinimg.com/236x/08/44/c5/0844c5eb33e92d674e6ad124bac4903a.jpg"
        sx={{ width: "50px", borderRadius: "50%" }}
      />
      <Typography>Tri kute</Typography>
    </Paper>
  );
};

export default UserChatButtons;
