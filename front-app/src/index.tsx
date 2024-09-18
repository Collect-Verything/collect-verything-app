import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { HomePage } from "./main-pages/home";
import { MainLayout } from "./common/component/main-layout";
import { SolutionPage } from "./main-pages/solution";
import { Tarification } from "./main-pages/tarification";
import { LoginPage } from "./main-pages/login";
import { RegisterPage } from "./main-pages/register";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Basket } from "./main-pages/basket";

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
        <RouterProvider router={router} />
    </LocalizationProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
