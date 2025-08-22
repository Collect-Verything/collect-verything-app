import { MDBBtn, MDBTypography } from "mdb-react-ui-kit";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import { ListBasketType } from "../boutique/type";

interface PickUpMapProps {
    handleDelivery: () => void;
}

export const PickUpMap = (props: PickUpMapProps) => {
    const { handleDelivery } = props;
    return (
        <>
            <MDBTypography tag="h5">
                <img
                    width={500}
                    src={`${process.env.PUBLIC_URL}/assets/illustrations/point-relais.png`}
                    alt="Illustration"
                />
            </MDBTypography>
            <Divider />;
            <MDBBtn color="dark" size="lg">
                <div className="d-flex justify-content-center" onClick={handleDelivery}>
                    <span>
                        VALIDER
                        <i className="fas fa-long-arrow-alt-right ms-2"></i>
                    </span>
                </div>
            </MDBBtn>
        </>
    );
};

interface PickUpShopProps {
    handleDelivery: () => void;
}

export const PickUpShop = (props: PickUpShopProps) => {
    const { handleDelivery } = props;

    return (
        <>
            <Box mb={3}>
                <Typography variant="body1" gutterBottom>
                    Vous pouvez venir récupérer votre colis d&apos;ici une heure, le temps que le traitement soit
                    effectué.
                </Typography>
                <Typography variant="body1">Un mail contenant plus d&apos;informations va vous être envoyé.</Typography>
            </Box>

            <Divider />
            <MDBBtn color="dark" size="lg">
                <div className="d-flex justify-content-center" onClick={handleDelivery}>
                    <span>
                        VALIDER
                        <i className="fas fa-long-arrow-alt-right ms-2"></i>
                    </span>
                </div>
            </MDBBtn>
            <Divider />

            <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                    Plage horaire de disponibilité de notre boutique :
                </Typography>
                <Box ml={2}>
                    <Typography variant="body1">Lundi : 10h - 17h</Typography>
                    <Typography variant="body1">Mardi : 10h - 17h</Typography>
                    <Typography variant="body1">Mercredi : 10h - 17h</Typography>
                    <Typography variant="body1">Jeudi : 10h - 17h</Typography>
                    <Typography variant="body1">Vendredi : 10h - 17h</Typography>
                    <Typography variant="body1">Samedi : 10h - 17h</Typography>
                    <Typography variant="body1">
                        Dimanche : <span style={{ color: "red", fontWeight: "bold" }}>Fermé</span>
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export const NoItemBasket = () => {
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: "50vh" }}>
            <Typography variant="h3" color="textSecondary">
                Aucun article dans votre panier
            </Typography>
        </Grid>
    );
};

interface DisplayCountItemBasketProps {
    list: ListBasketType[];
}

export const DisplayCountItemBasket = (props: DisplayCountItemBasketProps) => {
    const { list } = props;
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <p className="mb-0">Vous possedez actuellement {list.length} article(s) dans votre panier.</p>
            </div>
        </div>
    );
};
