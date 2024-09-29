import React, { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import { PRIMARY_COLOR } from "../../common/styles/theme";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DisplayMenuDependingJob } from "./items";
import { useSelector } from "react-redux";
import { checkToken, useAppDispatch } from "../../features/authentication-slice";

const GAP_MENU_ITEMS_USER = 8;

export const SideBar = () => {
    const [sideBar, setSideBar] = useState(true);
    const dispatch = useAppDispatch();

    // eslint-disable-next-line
    const { role } = useSelector((store: any) => store.authenticate);

    const handleSideBar = () => {
        setSideBar(!sideBar);
    };

    useEffect(() => {
        dispatch(checkToken());
    }, []);

    return (
        <Grid2
            width={sideBar ? "20vw" : "5vw"}
            height="100vh"
            sx={{ backgroundColor: PRIMARY_COLOR, boxShadow: `2px 3px 19px #bababa`, transition: "0.3s" }}
            container
            flexDirection="column"
            justifyContent="space-between"
        >
            <Grid container alignContent="center" justifyContent="center">
                <Link to="/">
                    <img
                        style={{ paddingTop: 20, transition: "0.3s" }}
                        width={sideBar ? "70" : "50"}
                        src={`${process.env.PUBLIC_URL}/assets/logo/logo-header.png`}
                        alt="Favicon"
                    />
                </Link>
            </Grid>

            {/*TODO: Upgrad l'apparition du text a l'ouverture fermeture de la side */}
            {sideBar ? (
                <Grid2
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="left"
                    ml={6}
                    gap={GAP_MENU_ITEMS_USER}
                >
                    <DisplayMenuDependingJob role={role} option="with-label" />
                </Grid2>
            ) : (
                <Grid2
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={GAP_MENU_ITEMS_USER}
                >
                    <DisplayMenuDependingJob role={role} option="only-icon" />
                </Grid2>
            )}

            {sideBar ? (
                <Grid container alignContent="center" justifyContent="center" mb={4}>
                    <ArrowBackIosNewIcon onClick={handleSideBar} />
                </Grid>
            ) : (
                <Grid container alignContent="center" justifyContent="center" mb={4}>
                    <ArrowForwardIosIcon onClick={handleSideBar} />
                </Grid>
            )}
        </Grid2>
    );
};
