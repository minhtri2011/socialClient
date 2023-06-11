import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

const customTheme = (mode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      mlg: 1536,
      xl: 1800,
    },
  },
  palette: {
    mode: mode,
    ...(mode==='light' ? lightTheme.palette : darkTheme.palette),
  },
});

export default customTheme;
