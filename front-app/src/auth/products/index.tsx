import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../shop/vitrine/request";
import { ProductEntity } from "../../shop/boutique/type";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnsProduct } from "./grid-definition";
import CircularProgress from "@mui/material/CircularProgress";
import { CreateProduct } from "./dialogs/create-product";
import { findAllProducts } from "./request";

export const ProductsPage = () => {
    const [products, setProducts] = useState<ProductEntity[]>();

    useEffect(() => {
        findAllProducts().then(setProducts);
    }, []);

    if (!products)
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box sx={{ height: 700, width: "80%" }} padding={5} margin="auto" marginTop={2}>
            <Grid container justifyContent="flex-end" padding={5}>
                <CreateProduct handleGetAll={getAllProducts} />
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
