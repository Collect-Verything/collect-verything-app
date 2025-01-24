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
import { ProductsPage } from "../../auth/products";
import { URL_FRONT } from "./const";
import { DetailsProductPage } from "../../shop/details-product-page";
import StripeStatusPayement from "../../shop/stripe";
import { CreateUserStripePage } from "../../shop/stripe/create-user-stripe";
import {PaymentPageGeneration} from "../../shop/stripe/embedded-checkout";

// TODO : Remplacer avec les constante
// TODO : Placer les url stripe-status-payement et create-user-stripe dans un guard qui permet d'y acceder si l'on est conecté

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: URL_FRONT.HOME,
                element: <HomePage />,
            },
            {
                path: URL_FRONT.VITRINE,
                element: <VitrinePage />,
            },
            {
                path: URL_FRONT.BOUTIQUE,
                element: <BoutiquePage />,
            },
            {
                path: URL_FRONT.RESSOURCE,
                element: <ResourcePage />,
            },
            {
                path: URL_FRONT.BASKET,
                element: <Basket />,
            },
            {
                path: URL_FRONT.EMBEDDED_CHECKOUT,
                element: <PaymentPageGeneration />,
            },
            {
                path: URL_FRONT.DETAILS,
                element: <DetailsProductPage />,
            },
            {
                path: "stripe-status-payement",
                element: <StripeStatusPayement />,
            },
            {
                path: "create-user-stripe",
                element: <CreateUserStripePage />,
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
        path: URL_FRONT.ADMIN,
        element: <AuthMainLayout />,
        children: [
            {
                path: URL_FRONT.HOME,
                element: <AuthDashboard />,
            },
            {
                path: URL_FRONT.ACCOUNT,
                element: <Account />,
            },
            {
                path: URL_FRONT.PRODUCTS,
                element: <ProductsPage />,
            },
            {
                path: URL_FRONT.FACTURATION,
                element: <Facturation />,
            },
            {
                path: URL_FRONT.CONFIG_SERVICE,
                element: <ConfigProducts />,
            },
            {
                path: URL_FRONT.SUPPORT,
                element: <Support />,
            },
            {
                path: URL_FRONT.DOC,
                element: <Documentation />,
            },
            // TODO : Creer un SUper ADmin guard
            // Next Is For SUPER_ADMIN ONLY
            {
                path: URL_FRONT.GESTION_PERSON,
                element: <Job />,
            },
            {
                path: URL_FRONT.GESTION_CUSTOMER,
                element: <Customer />,
            },
            {
                path: URL_FRONT.STATS,
                element: <Stats />,
            },
        ],
    },
    {
        path: URL_FRONT.LOGIN,
        element: <LoginPage />,
    },
    {
        path: URL_FRONT.REGISTER,
        element: <RegisterPage />,
    },
    //     TODO : Forgot password
]);
