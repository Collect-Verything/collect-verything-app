import { Header } from "../../common/component/header";
import { Footer } from "../../common/component/footer";
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
