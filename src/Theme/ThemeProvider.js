import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EE384E",
      light: "#F8EBED",
      dark: "#AB717D",
      contrastText: "#fff",
    },
    secondary: {
      main: "#48BB78",
      light: "#CBD5E0",
      dark: "#AB717D",
      contrastText: "#fff",
    },
  },
  // typography: {
  //   fontFamily: {
  //     main: "sans-serif",
  //     secndary: "Roboto",
  //   },
  // },
});
export default theme;
