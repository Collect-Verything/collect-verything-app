import { useEffect, useState } from "react";
import { apiGet } from "../../../common/utils/web";
import { DeliveryUrlWithPort } from "../../../app/micro-services";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { DataGrid } from "@mui/x-data-grid";
import { columnsDelivery, DeliveryType } from "./grid-definition";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export const DeliveryPage = () => {
    const [deliveryList, setDeliveryList] = useState<DeliveryType[]>();

    useEffect(() => {
        apiGet(`${DeliveryUrlWithPort}`).then(setDeliveryList);
    }, []);

    if (!deliveryList) return <p>LOADING</p>;

    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            <Grid container justifyContent="space-between" alignItems="center" pb={5} pr={2} pl={2}>
                <Grid>
                    <Typography variant="h4" component="div">
                        <LocalShippingIcon fontSize="large" /> Gestion des colis
                    </Typography>
                </Grid>
            </Grid>
            <Grid>
                <Grid mb={3}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => window.location.reload()}
                        startIcon={<AutorenewIcon />}
                    >
                        Rafraîchir
                    </Button>
                </Grid>
                <Grid>
                    <DataGrid
                        rows={deliveryList}
                        columns={columnsDelivery}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
