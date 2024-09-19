import Grid from "@mui/material/Grid2";
import React from "react";
interface BackgroundBlurPngProps {
    url: string;
    blur: string;
}
export const BackgroundBlurPng = ({ url,blur }: BackgroundBlurPngProps) => {
    return(
        <Grid
            sx={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/${url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                filter: `blur(${blur})`,
                zIndex: -1,
            }}
        ></Grid>
    )
}