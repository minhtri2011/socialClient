import { colorTokens } from "./colors";

export const lightTheme = {
  palette: {
    primary: {
      dark: colorTokens.primary[700],
      main: colorTokens.primary[500],
      light: colorTokens.primary[50],
    },
    neutral: {
      dark: colorTokens.grey[700],
      main: colorTokens.grey[500],
      mediumMain: colorTokens.grey[400],
      medium: colorTokens.grey[300],
      light: colorTokens.grey[50],
    },
    background: {
      default: colorTokens.grey[10],
      alt: colorTokens.grey[0],
    },
  },
};
