import React from "react";
import { Button } from "@mui/material";
import { noOp } from "../../utils/tools";

interface ButtonRoundedProps {
    label: string;
    mt?: number;
    mb?: number;
    bgColor?: string;
    txtColor?: string;
    handleFx?: () => void;
}

export const ButtonRounded = ({
    label,
    mt = 0,
    mb = 0,
    bgColor = "black",
    txtColor = "white",
    handleFx = noOp,
}: ButtonRoundedProps) => {
    return (
        <Button
            onClick={handleFx}
            variant="contained"
            sx={{
                marginTop: mt,
                marginBottom: mb,
                bgcolor: bgColor,
                color: txtColor,
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
