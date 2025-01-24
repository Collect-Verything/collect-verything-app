import { apiGet, apiPatch, apiPost } from "../../common/utils/web";
import { FacturationUrlWithPort, UserUrlWithPort } from "../../app/micro-services";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { User } from "../../common/types/user";
import { updateStripeId, useAppDispatch } from "../../features/authentication-slice";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export const CreateUserStripePage = () => {
    const dispatch = useAppDispatch();
    const user = useSelector((store: any) => store.authenticate);

    const nav = useNavigate();

    const [userState, setUserState] = useState<Partial<User> | null>(null);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        setUserState(user);

        const fetchData = async () => {
            localStorage.removeItem("id_stripe");
            try {
                const userById = await apiGet(`${UserUrlWithPort}/${user.id}`);
                const stripeResponse = await apiPost(`${FacturationUrlWithPort}/customer/create`, userById);
                const stripe_id = stripeResponse.id;
                await apiPatch(`${UserUrlWithPort}/stripe-user/${user.id}/${stripe_id}`);
                dispatch(updateStripeId(stripe_id));

                setIsCreate(true);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [user]);

    return (
        <>
            {!isCreate ? (
                <Grid direction="row" height="50vh" container justifyContent="center" alignItems="center">
                    <CircularProgress color="secondary" size="4rem" />
                </Grid>
            ) : (
                <Grid height="50vh" container alignItems="center" justifyContent="center">
                    <Grid textAlign="center">
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Compte de facturation generé avec succés, vous pouvez retourner au formulaire de paiement
                        </Alert>

                        <Button sx={{ marginTop: 3 }} variant="outlined" onClick={() => nav(`/basket`)}>
                            <Typography color="secondary" variant="body1">
                                Retourner au Formulaire de paiement
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            )}
        </>
    );
};
