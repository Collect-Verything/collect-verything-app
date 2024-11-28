import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { getHt, getTva, sanitizePrice } from "../../../common/utils/pricing";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CircularProgress from "@mui/material/CircularProgress";

interface PaiementCardProps {
    backgroundColor: string;
    totalPrice: number;
}

export const PaiementCard = (props: PaiementCardProps) => {
    const { backgroundColor, totalPrice } = props;
    const [statusPaiement, setStatusPaiement] = useState<boolean>(false);
    const [statusButtonPaiement, setStatusButtonPaiement] = useState<boolean>(false);

    const handlePayement = () => {
        setStatusButtonPaiement(true);
        setTimeout(() => {
            console.log("Simulation paiement");
            setStatusPaiement(true);
            setStatusButtonPaiement(false);
            localStorage.removeItem("basket");
        }, 2000);
    };

    return (
        <MDBCol lg="5">
            <MDBCard className="text-white rounded-3" style={statusPaiement ? { color: "green" } : { backgroundColor }}>
                {statusPaiement ? (
                    <Grid margin="auto" textAlign="center" spacing={2} mb={16} mt={15}>
                        <DoneOutlineIcon color="success" />
                        <Typography color="textPrimary">Paiement validé</Typography>
                    </Grid>
                ) : (
                    <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h5" className="mb-0">
                                Paiement
                            </MDBTypography>
                            <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                fluid
                                className="rounded-3"
                                style={{ width: "45px" }}
                                alt="Avatar"
                            />
                        </div>

                        <p className="small">Card type</p>
                            <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                            <MDBIcon fab icon="cc-visa fa-2x me-2" />
                            <MDBIcon fab icon="cc-amex fa-2x me-2" />
                            <MDBIcon fab icon="cc-paypal fa-2x me-2" />

                        <form className="mt-4">
                            <MDBInput
                                className="mb-4"
                                label="Cardholder's Name"
                                type="text"
                                size="lg"
                                placeholder="Cardholder's Name"
                                contrast
                            />

                            <MDBInput
                                className="mb-4"
                                label="Card Number"
                                type="text"
                                size="lg"
                                minLength={19}
                                maxLength={19}
                                placeholder="1234 5678 9012 3457"
                                contrast
                            />

                            <MDBRow className="mb-4">
                                <MDBCol md="6">
                                    <MDBInput
                                        className="mb-4"
                                        label="Expiration"
                                        type="text"
                                        size="lg"
                                        minLength={7}
                                        maxLength={7}
                                        placeholder="MM/YYYY"
                                        contrast
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        className="mb-4"
                                        label="Cvv"
                                        type="text"
                                        size="lg"
                                        minLength={3}
                                        maxLength={3}
                                        placeholder="&#9679;&#9679;&#9679;"
                                        contrast
                                    />
                                </MDBCol>
                            </MDBRow>
                        </form>

                        <hr />

                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Hors Taxe</p>
                            <p className="mb-2">{sanitizePrice(getHt(totalPrice))}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p className="mb-2">TVA</p>
                            <p className="mb-2">{sanitizePrice(getTva(totalPrice))}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">0.00 €</p>
                        </div>

                        <MDBBtn color="dark" block size="lg">
                            {statusButtonPaiement ? (
                                <CircularProgress />
                            ) : (
                                <div className="d-flex justify-content-between" onClick={handlePayement}>
                                    <span>{sanitizePrice(totalPrice)}</span>
                                    <span>
                                        PAYER
                                        <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                    </span>
                                </div>
                            )}
                        </MDBBtn>
                    </MDBCardBody>
                )}
            </MDBCard>
        </MDBCol>
    );
};
