import Grid from "@mui/material/Grid2";
import React, {useState} from "react";
import "./style.css";
import {Typography} from "@mui/material";


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

export const SwitchInputsRoundedWithChild = ({children}: InputsRoundedWithChildProps) => {
    const [isSwitched, setIsSwitched] = useState(true);
    return (
        <Grid container alignItems="center">
            <label className="switch">
                <input onClick={() => setIsSwitched(!isSwitched)} type="checkbox" className="checkbox"/>
                <span className="slider round">
         {isSwitched ?
             <Typography textAlign="right" pt={1.8} pr={2} fontSize="0.8rem" variant="subtitle2">
                 Annuel (économisez 25 %)
             </Typography>
             : <Typography textAlign="left" pt={1.8} pl={5}  fontSize="0.8rem" variant="subtitle2">
                 Mensuel (20€/mois)
             </Typography>}
                </span>
            </label>
        </Grid>
    );
}