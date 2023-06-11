import { ThemeProvider } from "@mui/system";
import { RouterProvider } from "react-router-dom";
// import "./App.css";
import routers from "./routers/index";
import CssBaseline from "@mui/material/CssBaseline";
import customTheme from "./themes";
import { useMemo, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectorDarkMode } from "./redux/slice/themeSlice";
import { Toaster } from 'react-hot-toast';
function App() {
  // const [mode,setMode]=useState('light')
  const mode = useSelector(selectorDarkMode)
  const theme = useMemo(()=>createTheme(customTheme(mode)),[mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routers} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
