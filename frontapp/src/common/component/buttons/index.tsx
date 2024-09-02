import React from "react";
import {Button} from "@mui/material";

interface ButtonRoundedProps {
    label: string;
}

export const ButtonRounded = ({ label }: ButtonRoundedProps) => {
    return (
        <Button
            variant="contained"
            sx={{
                bgcolor: 'black',
                color: 'white',
                padding: '5px 23px',
                borderRadius: '20px',
                textTransform: 'none',
                '&:hover': {
                    bgcolor: 'darkgray',
                },
            }}
        >
            {label}
        </Button>
    );
};