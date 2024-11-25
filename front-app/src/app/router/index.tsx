import { createBrowserRouter, Link } from "react-router-dom";
import { HomePage } from "../../shop/home";
import { VitrinePage } from "../../shop/vitrine";
import { BoutiquePage } from "../../shop/boutique";
import { ResourcePage } from "../../shop/ressource";
import { Basket } from "../../shop/basket";
import { AuthDashboard } from "../../auth/dashboard";
import { LoginPage } from "../../shop/login";
import { RegisterPage } from "../../shop/register";
import React from "react";
import { MainLayout } from "../../shop/main-layout";
import { Account } from "../../auth/account";
import { ConfigProducts } from "../../auth/config-products";
import { Documentation } from "../../auth/documentation";
import { Facturation } from "../../auth/facturation";
import { Support } from "../../auth/support";
import { AuthMainLayout } from "../../auth/main-layout";
import { Job } from "../../auth/admin/job";
import { Customer } from "../../auth/admin/customer";
import { Stats } from "../../auth/admin/stats";

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
                path: "Vitrine",
                element: <VitrinePage />,
            },
            {
                path: "Boutique",
                element: <BoutiquePage />,
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
    //  TODO : Implementer un USER Guard
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
            // TODO : Creer un SUper ADmin guard
            // Next Is For SUPER_ADMIN ONLY
            {
                path: "job",
                element: <Job />,
            },
            {
                path: "customer",
                element: <Customer />,
            },
            {
                path: "stats",
                element: <Stats />,
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
    //     TODO : Forgot password
]);
