import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Subscription } from "./type";
import { getUserListSolutionSub } from "./request";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {columnsInvoices} from "../facturation/grid-definition";
import {columnsConfig} from "./grid-definition"; // Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

// Pour recuperer des config de solution client il faut suivre le workflox definit dans la doc conernant la facturation des service, une fois ceci fait un  ou des subscription sont disponible et consultable

export const SubscriptionConfigDisplay = () => {
    const user = useSelector((store: any) => store.authenticate);
    const [listSolutions, setListSolutions] = useState<Subscription[]>([]);

    useEffect(() => {
        getUserListSolutionSub(user.id_stripe).then(setListSolutions);
    }, []);

    if (listSolutions.length === 0) return <p>Vous ne possedez aucun abonement ni configuration pour le moment.</p>;

    return (
        <Box sx={{ height: 700, width: "80%" }} mt={10} padding={5} margin="auto" marginTop={2}>
            <DataGrid
                rows={listSolutions || []}
                columns={columnsConfig}
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
