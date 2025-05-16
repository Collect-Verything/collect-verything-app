import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import React from "react";
import { legalItems, LegalProps } from "../../../common/assets/legal-text";
import { ScrollDialogChildText } from "../../../common/dialog";
import { socialMediaItems, SocialMediaProps } from "../../../common/assets/social-media-links";

export const Footer = () => (
    <Grid justifyContent="space-between" alignItems="center" textAlign="center" spacing={2} mt={10}>
        <Grid pl={3}>
            <Link to="/">
                <img width={100} src={`${process.env.PUBLIC_URL}/assets/logo/logo-header.png`} alt="Favicon" />
            </Link>
        </Grid>

        <Grid container spacing={1} ml={2} mt={4} mb={5} justifyContent="center">
            {socialMediaItems.map((media: SocialMediaProps, index) => (
                <Grid key={index}>
                    <Link style={{ textDecoration: "none", color: "black" }} to={media.link}>
                        {media.icon}
                    </Link>
                </Grid>
            ))}
        </Grid>

        <Grid container spacing={10} justifyContent="center">
            {legalItems.map((legal: LegalProps, index: number) => (
                <ScrollDialogChildText key={index} title={legal.label}>
                    {() => legal.children}
                </ScrollDialogChildText>
            ))}
        </Grid>
    </Grid>
);
