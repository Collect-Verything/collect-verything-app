import { createBrowserRouter, Link } from "react-router-dom";
import { HomePage } from "../../shop/home";
import { SolutionPage } from "../../shop/solution";
import { Tarification } from "../../shop/tarification";
import { ResourcePage } from "../../shop/ressource";
import { Basket } from "../../shop/basket";
import { AuthDashboard } from "../../auth/dashboard";
import { LoginPage } from "../../shop/login";
import { RegisterPage } from "../../shop/register";
import React from "react";
import {MainLayout} from "../../common/component/main-layout";

export const router = createBrowserRouter([
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
                path: "Ressource",
                element: <ResourcePage />,
            },
            {
                path: "Basket",
                element: <Basket />,
            },
        ],
    },
    {
        path: "*",
        element: (
            <div>
                <h1>Error 404</h1>
                <Link to="/">Go Home</Link>
            </div>
        ),
    },
    {
        path: "Auth",
        element: <AuthDashboard />,
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
