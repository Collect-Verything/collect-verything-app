import Grid from "@mui/material/Grid2";
import React from "react";

interface InputsRoundedWithChildProps {
    children: React.ReactNode;
}

export const InputsRoundedWithChild = ({children}: InputsRoundedWithChildProps) => {
    return (
        <Grid container alignItems="center">
            <Grid>
                <input
                    type="email"
                    placeholder="Votre adresse e-mail"
                    style={{
                        padding: '10px 15px',
                        borderRadius: '50px',
                        border: '1px solid #ccc',
                        width: '159%',
                        fontSize: '1rem',
                    }}
                />
            </Grid>
            <Grid>
                {children}
            </Grid>
        </Grid>
    )
}