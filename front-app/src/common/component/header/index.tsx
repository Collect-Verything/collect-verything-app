import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ButtonRounded } from "../buttons";
import { websitePageItems, WebsitePageItemsProps } from "./list";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Header = () => {
    const [basketStorage, setBasketStorage] = useState<boolean>();

    useEffect(() => {
        const userStorage = localStorage.getItem("basket");
        if (userStorage) {
            setBasketStorage(true);
        } else {
            setBasketStorage(false);
        }
    }, []);

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid pl={10}>
                <Link to="/">
                    <img width={80} src={`${process.env.PUBLIC_URL}/assets/logo/logo-header.png`} alt="Favicon" />
                </Link>
            </Grid>
            <Grid container spacing={10}>
                {websitePageItems.map((item: WebsitePageItemsProps, index) => (
                    <Link key={index} style={{ textDecoration: "none", color: "black" }} to={item.link}>
                        {item.label}
                    </Link>
                ))}
                {basketStorage && (
                    <Link style={{ textDecoration: "none", color: "black" }} to={"/basket"}>
                        <ShoppingCartIcon />
                    </Link>
                )}
            </Grid>
            <Grid container pr={3} spacing={2} alignItems="center">
                <Grid>
                    <Link style={{ textDecoration: "none", color: "black" }} to="login">
                        Se connecter
                    </Link>
                </Grid>
                <Grid>
                    <Button sx={{ textTransform: "none" }}>
                        <ButtonRounded label="Démarer un essai" />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
