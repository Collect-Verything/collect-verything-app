import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import React from "react";

export interface SocialMediaProps {
    link: string;
    icon: React.ReactNode;
}

export const socialMediaItems: SocialMediaProps[] = [
    { link: "https://facebook.com", icon: <FacebookIcon /> },
    { link: "https://instagram.com", icon: <InstagramIcon /> },
    { link: "https://linkedin.com", icon: <LinkedInIcon /> },
    { link: "https://pinterest.com", icon: <PinterestIcon /> },
    { link: "https://x.com", icon: <XIcon /> },
    { link: "https://youtube.com", icon: <YouTubeIcon /> },
];
