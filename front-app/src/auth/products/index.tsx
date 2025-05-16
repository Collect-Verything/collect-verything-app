import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../shop/vitrine/request";
import { ProductEntity } from "../../shop/boutique/type";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsProduct } from "./grid-definition";
import CircularProgress from "@mui/material/CircularProgress";
import { CreateProduct } from "./dialogs/create-product";
import { findAllProducts } from "./request";
import { Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { CenteredGrid } from "../../common/components/grid-centered";

export const ProductsPage = () => {
    const [products, setProducts] = useState<ProductEntity[]>();

    useEffect(() => {
        findAllProducts().then(setProducts);
    }, []);

    if (!products)
        return (
            <CenteredGrid>
                <CircularProgress />
            </CenteredGrid>
        );

    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            <Grid container justifyContent="space-between" alignItems="center" pb={5} pr={2} pl={2}>
                <Grid>
                    <Typography variant="h4" component="div">
                        <CategoryIcon fontSize="large" /> Gestion produits
                    </Typography>
                </Grid>
                <Grid>
                    <CreateProduct handleGetAll={getAllProducts} />
                </Grid>
            </Grid>

            <DataGrid
                rows={products || []}
                columns={columnsProduct}
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
        </Box>
    );
};
