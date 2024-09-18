import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import "./style.css";
import { Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

interface InputsRoundedWithChildProps {
    children: React.ReactNode;
    width: string;
}

export const InputsRoundedWithChild = ({ children, width }: InputsRoundedWithChildProps) => {
    return (
        <Grid container alignItems="center">
            <Grid>
                <input
                    type="email"
                    placeholder="Votre adresse e-mail"
                    style={{
                        padding: "10px 15px",
                        borderRadius: "50px",
                        border: "1px solid #ccc",
                        width: width,
                        fontSize: "1rem",
                    }}
                />
            </Grid>
            <Grid>{children}</Grid>
        </Grid>
    );
};

export const SwitchInputsRoundedWithChild = () => {
    const [isSwitched, setIsSwitched] = useState(true);
    return (
        <Grid container alignItems="center" justifyContent="center">
            <label className="switch">
                <input onClick={() => setIsSwitched(!isSwitched)} type="checkbox" className="checkbox" />
                <span className="slider round">
                    {isSwitched ? (
                        <Typography textAlign="right" pt={1.7} pr={2} fontSize="0.8rem" variant="subtitle2">
                            Annuel (économisez 25 %)
                        </Typography>
                    ) : (
                        <Typography textAlign="left" pt={1.7} pl={5} fontSize="0.8rem" variant="subtitle2">
                            Mensuel (20€/mois)
                        </Typography>
                    )}
                </span>
                <span style={{ position: "relative" }}>
                    {isSwitched ? (
                        <Typography textAlign="left" mt={-1} pl={8}>
                            <AccessTimeIcon />
                        </Typography>
                    ) : (
                        <Typography textAlign="right" mt={-1} pr={8}>
                            <AccessTimeFilledIcon />
                        </Typography>
                    )}
                </span>
            </label>
        </Grid>
    );
};
