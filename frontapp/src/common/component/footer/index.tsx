import Grid from "@mui/material/Grid2";
import {Link} from "react-router-dom";
import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Footer = () => (
    <Grid justifyContent="space-between" alignItems="center" textAlign="center" spacing={2} mt={10}>
        <Grid pl={3}>
            <Link to="/">
                <img width={60} src={`${process.env.PUBLIC_URL}/assets/logo/logo-header.png`} alt="Favicon"/>
            </Link>
        </Grid>

        <Grid container spacing={1} ml={2} mt={2} mb={5} justifyContent="center">
            {[
                <FacebookIcon/>,
                <InstagramIcon/>,
                <LinkedInIcon/>,
                <PinterestIcon/>,
                <XIcon/>,
                <YouTubeIcon/>,
            ].map((label) => (
                <Grid>
                    <Link style={{textDecoration: 'none', color: 'black'}} to="placeholder">{label}</Link>
                </Grid>
            ))}
        </Grid>

        <Grid container spacing={10} justifyContent="center">
            {["Conditions générales d’utilisation", "Politique de confidentialité", "Mentions légales", "Gestion de la confidentialité"].map((label) => (
                <Grid>
                    <Link style={{textDecoration: 'none', color: 'black', fontSize: "0.8rem"}} to="placeholder">{label}</Link>
                </Grid>
            ))}
        </Grid>
    </Grid>
)