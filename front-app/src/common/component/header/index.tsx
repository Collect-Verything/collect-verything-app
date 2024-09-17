import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import React from "react";
import { Button } from "@mui/material";
import { ButtonRounded } from "../buttons";
import { websitePageItems, WebsitePageItemsProps } from "./list";

export const Header = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid pl={3}>
        <Link to="/">
          <img
            width={80}
            src={`${process.env.PUBLIC_URL}/assets/logo/logo-header.png`}
            alt="Favicon"
          />
        </Link>
      </Grid>
      <Grid container spacing={10}>
        {websitePageItems.map((item: WebsitePageItemsProps) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={item.link}
          >
            {item.label}
          </Link>
        ))}
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
