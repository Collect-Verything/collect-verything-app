import React from "react";
import { Button } from "@mui/material";
import { noOp } from "../../utils/void";

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

interface ButtonRoundedSizedProps extends ButtonRoundedProps {
    width?: string;
    height?: string;
}

export const ButtonRoundedSized = ({
    label,
    mt = 0,
    mb = 0,
    bgColor = "black",
    txtColor = "white",
    handleFx = noOp,
    width,
    height,
}: ButtonRoundedSizedProps) => {
    return (
        <Button
            onClick={handleFx}
            variant="contained"
            sx={{
                width: width,
                height: height,
                marginTop: mt,
                marginBottom: mb,
                bgcolor: bgColor,
                color: txtColor,
                padding: "5px 23px",
                borderRadius: "25px",
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
