import React from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { router } from "../router";
import { store } from "../../features/store";
import { theme } from "../../common/styles/theme";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export const App: React.FC = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <RouterProvider router={router} />
                    </LocalizationProvider>
                </ThemeProvider>
            </Provider>
        </LocalizationProvider>
    );
};
