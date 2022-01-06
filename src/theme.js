import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#2d70ec",
        },
        secondary: {
            main: "#f50057",
        },
        success: {
            main: "#43a047",
            contrastText: "#ffffff",
        },
        info: {
            main: "#2196f3",
        },
        error: {
            main: "#ef5350",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#ffb74d",
            contrastText: "#ffffff",
        },
    },
});
