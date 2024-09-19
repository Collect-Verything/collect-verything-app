import { createTheme } from "@mui/material";

export const PRIMARY_COLOR = `#E7E6F6`;
export const PRIMARY_DARKER_COLOR = `#bcb9e3`;

export const theme = createTheme({
    palette: {
        primary: {
            main: PRIMARY_COLOR,
        },
        secondary: {
            main: PRIMARY_DARKER_COLOR,
        },
    },
});
