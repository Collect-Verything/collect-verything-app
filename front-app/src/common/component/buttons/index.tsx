import React from "react";
import { Button } from "@mui/material";

interface ButtonRoundedProps {
    label: string;
    mt?: number;
    mb?: number;
}

export const ButtonRounded = ({ label, mt = 0, mb = 0 }: ButtonRoundedProps) => {
    return (
        <Button
            variant="contained"
            sx={{
                marginTop: mt,
                marginBottom: mb,
                bgcolor: "black",
                color: "white",
                padding: "5px 23px",
                borderRadius: "20px",
                textTransform: "none",
                "&:hover": {
                    bgcolor: "darkgray",
                },
            }}
        >
            {label}
        </Button>
    );
};
