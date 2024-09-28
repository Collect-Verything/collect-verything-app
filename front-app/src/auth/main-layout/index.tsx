import { Outlet } from "react-router-dom";
import React from "react";

export const SideBar = () => {
    return <p>Side bar element</p>;
};

export const AuthMainLayout = () => {
    return (
        <div>
            <SideBar />
            <Outlet />
        </div>
    );
};
