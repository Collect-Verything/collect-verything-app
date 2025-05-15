import Grid from "@mui/material/Grid";
import React from "react";
interface BackgroundBlurPngProps {
    url: string;
    blur?: string;
    rotate?: string;
}
export const BackgroundBlurPng = ({ url, blur = "1.5", rotate = "0" }: BackgroundBlurPngProps) => {
    return (
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
                filter: `blur(${blur}rem)`,
                zIndex: -1,
                transform: `rotate(${rotate}deg)`,
            }}
        ></Grid>
    );
};
