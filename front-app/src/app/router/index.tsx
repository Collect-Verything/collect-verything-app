import { createBrowserRouter } from "react-router-dom";
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
import { SubscriptionConfigDisplay } from "../../auth/config";
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
import { CheckUserStripeIdForPayment, PaymentPage } from "../../shop/stripe/embedded-checkout";
import { ForgotPasswordPage } from "../../shop/forgot-password";
import Error404Page from "../../shop/not-found";
import { StripeStatusPayement } from "../../shop/stripe";

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
                path: URL_FRONT.CHECK_USER_STRIPE_ID,
                element: <CheckUserStripeIdForPayment />,
            },
            {
                path: URL_FRONT.DETAILS,
                element: <DetailsProductPage />,
            },
            {
                path: URL_FRONT.PAYMENT_STATUS,
                element: <StripeStatusPayement />,
            },
            {
                path: URL_FRONT.PAYMENT,
                element: <PaymentPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Error404Page />,
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
                path: URL_FRONT.CONFIG,
                element: <SubscriptionConfigDisplay />,
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
    {
        path: URL_FRONT.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
    },
]);
