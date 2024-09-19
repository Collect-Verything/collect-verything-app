import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { HomePage } from "./shop/home";
import { MainLayout } from "./common/component/main-layout";
import { SolutionPage } from "./shop/solution";
import { Tarification } from "./shop/tarification";
import { LoginPage } from "./shop/login";
import { RegisterPage } from "./shop/register";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Basket } from "./shop/basket";
import { ThemeProvider } from "@mui/material";
import { theme } from "./common/styles/theme";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "Solution",
                element: <SolutionPage />,
            },
            {
                path: "Tarification",
                element: <Tarification />,
            },
            {
                path: "Basket",
                element: <Basket />,
            },
        ],
    },
    {
        path: "test",
        element: (
            <div>
                <h1>Hello TEST World</h1>
                <Link to="/">Go Home</Link>
            </div>
        ),
    },
    {
        path: "Login",
        element: <LoginPage />,
    },
    {
        path: "Register",
        element: <RegisterPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </LocalizationProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
