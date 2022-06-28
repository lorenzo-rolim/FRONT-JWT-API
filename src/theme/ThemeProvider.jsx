import { createTheme } from "@mui/material";

const theme = createTheme({
  status: {
    danger: "green",
  },
  palette: {
    primary: {
      light: "#75e892",
      main: "#3fb543",
      dark: "#048400",
      contrastText: "#fff",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export default theme;
