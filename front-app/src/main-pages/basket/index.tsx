import React, { useEffect, useState } from "react";
import { productsDetails, ProductsDetailsType } from "../../common/assets/products/products-details";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ListBasketType } from "../tarification";
import { PAID_FREQUENCY } from "../../common/component/inputs";
import { getHt, getTva, mounthToAnnual, sanitizePrice } from "../../common/utils/pricing";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper"; // function createData(
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonRounded } from "../../common/component/buttons";
import { PRIMARY_COLOR, PRIMARY_DARKER_COLOR } from "../../common/styles/theme";

interface BasketDetailsType {
    product: ProductsDetailsType;
    frequency: PAID_FREQUENCY;
}

export const Basket = () => {
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
    const [listProducts, setListProducts] = useState<BasketDetailsType[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const loadBasketFromStorage = () => {
        const storedBasket = localStorage.getItem("basket");
        if (storedBasket) {
            const basketItems = JSON.parse(storedBasket);
            setListBasket(basketItems);
            const updatedListProducts = basketItems.map((item: ListBasketType) => ({
                product: productsDetails.find((prod) => prod.id === item.productId)!,
                frequency: item.paidFrequency,
            }));
            setListProducts(updatedListProducts);
        }
    };

    const handleClearAll = () => {
        setListBasket([]);
        setListProducts([]);
        localStorage.removeItem("basket");
    };

    const handleDeleteProduct = (index: number) => {
        const updatedBasket = listBasket.filter((_, i) => i !== index);
        setListBasket(updatedBasket);
        setListProducts(
            updatedBasket.map((item) => ({
                product: productsDetails.find((prod) => prod.id === item.productId)!,
                frequency: item.paidFrequency,
            })),
        );
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
    };

    useEffect(() => {
        const newTotal = listProducts.reduce((acc, prod) => {
            const productPrice =
                prod.frequency === PAID_FREQUENCY.YEAR
                    ? mounthToAnnual(prod.product.price_mounth)
                    : prod.product.price_mounth;
            return acc + productPrice;
        }, 0);
        setTotalPrice(newTotal);
    }, [listProducts]);

    useEffect(() => {
        loadBasketFromStorage();
    }, []);

    return (
        <Grid mt={"10%"}>
            {listProducts.length > 0 ? (
                <Grid>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid border={`2px solid ${PRIMARY_COLOR}`} borderRadius="14px" padding={2}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableBody>
                                        {listProducts.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <img
                                                        width={60}
                                                        src={`${process.env.PUBLIC_URL}/assets/products/${row.product.picture_url}`}
                                                        alt="Favicon"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">{row.product.title}</TableCell>
                                                <TableCell align="center">{row.product.class}</TableCell>
                                                <TableCell align="center">{row.frequency}</TableCell>
                                                <TableCell align="center">
                                                    {sanitizePrice(mounthToAnnual(row.product.price_mounth))}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={() => handleDeleteProduct(index)}>
                                                        <DeleteOutlineIcon sx={{ color: `${PRIMARY_DARKER_COLOR}` }} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid textAlign="center" mt={2}>
                                <ButtonRounded bgColor="#D32F2F" label="Clear all" handleFx={handleClearAll} />
                            </Grid>
                        </Grid>

                        <Grid border={"2px solid primary"} borderRadius="14px" padding={2}>
                            <Grid container>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Produits :
                                </Typography>
                                <Typography variant="subtitle2">&nbsp;{listProducts.length}</Typography>
                            </Grid>

                            <Grid container mt={2}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Ht&nbsp; :
                                </Typography>
                                <Typography variant="subtitle2">&nbsp;{sanitizePrice(getHt(totalPrice))}</Typography>
                            </Grid>

                            <Grid container>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tva :{" "}
                                </Typography>
                                <Typography variant="subtitle2">&nbsp;{sanitizePrice(getTva(totalPrice))}</Typography>
                            </Grid>

                            <Grid container mt={2}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    Total Ttc :{" "}
                                </Typography>
                                <Typography variant="subtitle1">&nbsp;{sanitizePrice(totalPrice)}</Typography>
                            </Grid>
                            <Grid textAlign="center" mt={2}>
                                <ButtonRounded
                                    bgColor={PRIMARY_DARKER_COLOR}
                                    label="Valider le panier"
                                    handleFx={handleClearAll}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Grid textAlign="center" mt={"15%"} mb={20}>
                    <Typography variant="h3" fontWeight={600}>
                        Votre panier est vide pour le moment
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};
