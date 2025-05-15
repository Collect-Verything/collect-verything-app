import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import React from "react";
import { PRIMARY_COLOR, PRIMARY_DARKER_COLOR } from "../../../common/styles/theme";
import { useNavigate } from "react-router-dom";
import { ProductEntity } from "../../boutique/type";
import { PATH_NAME } from "../../../common/const/path";

export interface VitrineUnitProductProps {
    product: ProductEntity;
}

export const VitrineUnitProduct: React.FC<VitrineUnitProductProps> = ({ product }) => {
    const nav = useNavigate();

    const handleRedirectSolution = () => {
        nav(`/${PATH_NAME.BOUTIQUE}`);
    };

    return (
        <Box
            onClick={handleRedirectSolution}
            sx={{
                width: "280px",
                position: "relative",
                borderRadius: "14px",
                background: "white",
                zIndex: 1,
                transition: "0.3s",
                textAlign: "left",
                border: `1px solid ${PRIMARY_COLOR}`,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "14px",
                    padding: "2px",
                    background: `linear-gradient( ${PRIMARY_COLOR}, silver)`,
                    "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    zIndex: -1,
                },
                "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.3s",
                    cursor: "pointer",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                },
            }}
        >
            {/* Grids avec le texte */}
            <Grid container spacing={2} padding={2} pt={5} pb={5}>
                <Grid>
                    <Typography variant="subtitle2">Taux de carte à partir de :</Typography>
                    <Typography variant="subtitle2">• 1,8 % + 0,25 € EUR en ligne</Typography>
                </Grid>

                <Grid>
                    <Typography variant="subtitle2" mt={2}>
                        Principales fonctionnalités :
                    </Typography>
                    <Typography variant="subtitle2">{product.description}</Typography>
                    {/*<Typography variant="subtitle2">• Analyses de données standard</Typography>*/}
                    {/*<Typography variant="subtitle2">• 10 emplacements des stocks</Typography>*/}
                    {/*<Typography variant="subtitle2">• Assistance par chat à tout moment</Typography>*/}
                    {/*<Typography variant="subtitle2">• Vente globale localisée</Typography>*/}
                    {/*<Typography variant="subtitle2">• Stockage serveur 2go</Typography>*/}
                </Grid>

                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        width: "100%",
                        borderTop: `2px solid ${PRIMARY_DARKER_COLOR}`,
                        borderBottom: `2px solid ${PRIMARY_DARKER_COLOR}`,
                        textAlign: "center",
                        pt: 3,
                        pb: 3,
                        mt: 9,
                        top: "150px",
                        backgroundColor: `${PRIMARY_COLOR}`,
                        transform: "translateY(50px)",
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Paiement mensuel
                    </Typography>
                </Box>
                <Grid mt={9}>
                    <Typography variant="subtitle2">{product.details}</Typography>
                    {/*TODO : Mise En Page a faire */}
                    {/*<Typography variant="subtitle2" color="black">*/}
                    {/*    • Le processus optimisé*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="subtitle2" color="black">*/}
                    {/*    • Analyses de données standard*/}
                    {/*</Typography>*/}
                    {/*<Typography*/}
                    {/*    variant="subtitle2"*/}
                    {/*    color={*/}
                    {/*        product === PRODUCT_FORMULA.PREMIUM || product === PRODUCT_FORMULA.MEDIUM ? "black" : "grey"*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    • 10 emplacements des stocks*/}
                    {/*</Typography>*/}
                    {/*<Typography*/}
                    {/*    variant="subtitle2"*/}
                    {/*    color={*/}
                    {/*        product === PRODUCT_FORMULA.PREMIUM || product === PRODUCT_FORMULA.MEDIUM ? "black" : "grey"*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    • Vente globale localisée*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="subtitle2" color={product === PRODUCT_FORMULA.PREMIUM ? "black" : "grey"}>*/}
                    {/*    • Stockage serveur 2go*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="subtitle2" color={product === PRODUCT_FORMULA.PREMIUM ? "black" : "grey"}>*/}
                    {/*    • Assistance par chat à tout moment*/}
                    {/*</Typography>*/}
                </Grid>
            </Grid>

            <Box
                sx={{
                    position: "absolute",
                    top: "-14px",
                    left: "calc(50% - 75px)",
                    background: `linear-gradient(to right, ${PRIMARY_COLOR}, ${PRIMARY_DARKER_COLOR})`,
                    borderRadius: "16px",
                    width: "150px",
                    height: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2,
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {product.name}
                </Typography>
            </Box>
        </Box>
    );
};
