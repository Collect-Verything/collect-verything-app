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
import { DetailsProductPage } from "../../shop/details-product-page";
import { CheckUserStripeIdForPayment, PaymentPage } from "../../shop/stripe/embedded-checkout";
import { ForgotPasswordPage } from "../../shop/forgot-password";
import Error404Page from "../../shop/not-found";
import { StripeStatusPayement } from "../../shop/stripe";
import { PATH_NAME } from "../../common/const/path";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: PATH_NAME.HOME,
                element: <HomePage />,
            },
            {
                path: PATH_NAME.VITRINE,
                element: <VitrinePage />,
            },
            {
                path: PATH_NAME.BOUTIQUE,
                element: <BoutiquePage />,
            },
            {
                path: PATH_NAME.RESSOURCE,
                element: <ResourcePage />,
            },
            {
                path: PATH_NAME.BASKET,
                element: <Basket />,
            },
            {
                path: PATH_NAME.CHECK_USER_STRIPE_ID,
                element: <CheckUserStripeIdForPayment />,
            },
            {
                path: PATH_NAME.DETAILS,
                element: <DetailsProductPage />,
            },
            {
                path: PATH_NAME.PAYMENT_STATUS,
                element: <StripeStatusPayement />,
            },
            {
                path: PATH_NAME.PAYMENT,
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
        path: PATH_NAME.ADMIN,
        element: <AuthMainLayout />,
        children: [
            {
                path: PATH_NAME.HOME,
                element: <AuthDashboard />,
            },
            {
                path: PATH_NAME.ACCOUNT,
                element: <Account />,
            },
            {
                path: PATH_NAME.PRODUCTS,
                element: <ProductsPage />,
            },
            {
                path: PATH_NAME.FACTURATION,
                element: <Facturation />,
            },
            {
                path: PATH_NAME.CONFIG,
                element: <SubscriptionConfigDisplay />,
            },
            {
                path: PATH_NAME.SUPPORT,
                element: <Support />,
            },
            {
                path: PATH_NAME.DOC,
                element: <Documentation />,
            },
            // TODO : Creer un SUper ADmin guard
            // Next Is For SUPER_ADMIN ONLY
            {
                path: PATH_NAME.GESTION_PERSON,
                element: <Job />,
            },
            {
                path: PATH_NAME.GESTION_CUSTOMER,
                element: <Customer />,
            },
            {
                path: PATH_NAME.STATS,
                element: <Stats />,
            },
        ],
    },
    {
        path: PATH_NAME.LOGIN,
        element: <LoginPage />,
    },
    {
        path: PATH_NAME.REGISTER,
        element: <RegisterPage />,
    },
    {
        path: PATH_NAME.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
    },
]);
