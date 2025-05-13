import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import { ButtonRounded } from "../buttons";
import { websitePageItems, WebsitePageItemsProps } from "./list";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { UserBadge } from "../badge";
import { checkToken, useAppDispatch } from "../../../features/authentication-slice";
import { URL_FRONT } from "../../../app/router/const";
import { RootState } from "../../../features/store";
import Badge from "@mui/material/Badge";
import { countBasketItems, getBasketCount } from "../../../features/basket-slice";

export const Header = () => {
    const { role } = useSelector((store: RootState) => store.authenticate);
    const dispatch = useAppDispatch();
    const count = useSelector(getBasketCount);

    useEffect(() => {
        dispatch(checkToken());
        dispatch(countBasketItems());
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
                        <Typography pt={1}>{item.label}</Typography>
                    </Link>
                ))}
                <Link style={{ textDecoration: "none", color: "black" }} to={`/${URL_FRONT.BASKET}`}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={count} color="error">
                            <ShoppingCartIcon color="secondary" />
                        </Badge>
                    </IconButton>
                </Link>
            </Grid>
            <Grid container pr={3} spacing={2} alignItems="center">
                {role ? (
                    <UserBadge />
                ) : (
                    <>
                        <Grid>
                            <Link style={{ textDecoration: "none", color: "black" }} to={`/${URL_FRONT.LOGIN}`}>
                                Se connecter
                            </Link>
                        </Grid>
                        <Grid>
                            <Button sx={{ textTransform: "none" }} href={`${URL_FRONT.REGISTER}`}>
                                <ButtonRounded label="Démarer un essai" />
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>
        </Grid>
    );
};
