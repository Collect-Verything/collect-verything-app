import { Header } from "../component/header";
import { Footer } from "../component/footer";
import { Outlet } from "react-router-dom";
import React from "react";

export const MainLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
