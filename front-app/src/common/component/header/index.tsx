import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { ButtonRounded } from "../buttons";
import { websitePageItems, WebsitePageItemsProps } from "./list";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Badge } from "../badge";
import { checkToken, useAppDispatch } from "../../../features/authentication-slice";

export const Header = () => {
    // eslint-disable-next-line
    const { role } = useSelector((store: any) => store.authenticate);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkToken());
    }, []);

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid pl={10}>
                <Link to="/">
                    <img
                        style={{ paddingTop: 20 }}
                        width={80}
                        src={`${process.env.PUBLIC_URL}/assets/logo/logo-header.png`}
                        alt="Favicon"
                    />
                </Link>
            </Grid>
            <Grid container spacing={10} pl={10}>
                {websitePageItems.map((item: WebsitePageItemsProps, index) => (
                    <Link key={index} style={{ textDecoration: "none", color: "black" }} to={item.link}>
                        {item.label}
                    </Link>
                ))}
                <Link style={{ textDecoration: "none", color: "black" }} to={"/basket"}>
                    <ShoppingCartIcon color="secondary" />
                </Link>
            </Grid>
            <Grid container pr={3} spacing={2} alignItems="center">
                {role ? (
                    <Badge />
                ) : (
                    <>
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
                    </>
                )}
            </Grid>
        </Grid>
    );
};
