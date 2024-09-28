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
import { MainLayout } from "../../shop/main-layout";
import { AuthMainLayout } from "../../auth/main-layout";
import { Account } from "../../auth/account";
import { ConfigProducts } from "../../auth/config-products";
import { Documentation } from "../../auth/documentation";
import { Facturation } from "../../auth/facturation";
import { Support } from "../../auth/support";

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
        element: <AuthMainLayout />,
        children: [
            {
                path: "",
                element: <AuthDashboard />,
            },
            {
                path: "account",
                element: <Account />,
            },
            {
                path: "facturation",
                element: <Facturation />,
            },
            {
                path: "config",
                element: <ConfigProducts />,
            },
            {
                path: "support",
                element: <Support />,
            },
            {
                path: "doc",
                element: <Documentation />,
            },
        ],
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
