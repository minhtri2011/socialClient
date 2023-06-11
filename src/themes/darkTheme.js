import { colorTokens } from "./colors";

export const darkTheme = {
  palette: {
    primary: {
      dark: colorTokens.primary[200],
      main: colorTokens.primary[500],
      light: colorTokens.primary[800],
    },
    neutral: {
      dark: colorTokens.grey[100],
      main: colorTokens.grey[200],
      mediumMain: colorTokens.grey[300],
      medium: colorTokens.grey[400],
      light: colorTokens.grey[700],
    },
    background: {
      default: colorTokens.grey[900],
      alt: colorTokens.grey[800],
    },
  },
};
