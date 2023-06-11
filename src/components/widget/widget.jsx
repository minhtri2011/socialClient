import { Box, styled } from "@mui/material";

const Widget = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem .75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: ".75rem",
}));

export default Widget;
 
