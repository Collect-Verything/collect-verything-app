import { ListBasketType } from "../boutique/type";
import React, { useCallback, useEffect, useState } from "react";
import { apiPost } from "../../common/utils/web";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { URL_FRONT } from "../../app/router/const";
import { setFromLocalStorage } from "../../common/utils/local-storage";
import { FacturationUrlWithPort } from "../../app/micro-services";
import { STRIPE_DETECTION } from "../../common/utils/stripe";
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_6YIhM0UXA4RMmJKovWtLYyJb");

export const PaymentPageGeneration = () => {
    const [listBasket, setListBasket] = useState<ListBasketType[]>([]);

    const [stripIdState, setStripIdState] = useState<string>();
    const nav = useNavigate();
    const { id_stripe } = useSelector((store: any) => store.authenticate);

    const fetchClientSecret = useCallback(async () => {
        const data = await apiPost(`${FacturationUrlWithPort}/checkout/create/${stripIdState}`, listBasket);
        return data.clientSecret;
    }, [listBasket]);

    const options = { fetchClientSecret };

    useEffect(() => {
        setFromLocalStorage("basket", setListBasket);
        setStripIdState(localStorage.getItem("id_stripe")!);
    }, []);

    if (listBasket.length === 0 || !id_stripe) return null;

    return (
        <>
            {stripIdState === STRIPE_DETECTION.NONE_USER && <Button href={"create-user-stripe"}>Generer </Button>}
            {stripIdState !== STRIPE_DETECTION.NONE_USER && (
                <Grid id="checkout">
                    <Button sx={{ marginLeft: "50px", marginTop: "50px" }} onClick={() => nav(`/${URL_FRONT.BASKET}`)}>
                        <KeyboardBackspaceIcon color="secondary" />
                        <Typography color="black">Retour au panier</Typography>
                    </Button>
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </Grid>
            )}
        </>
    );
};

// KILYAN EXEMPLE  f

// export const PaymentPageGeneration = () => {
//     const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
//     const [userState, setUserState] = useState<Partial<User>>();
//     // const id_stripe = localStorage.getItem("id_stripe");
//     const nav = useNavigate();
//     // const { userId } = useSelector((store: any) => store.authenticate);
//     const dispatch = useAppDispatch();
//
//     const fetchClientSecret = useCallback(async () => {
//         const data = await apiPost(`${FacturationUrlWithPort}/checkout/create/${userState?.id_stripe}`, listBasket);
//         return data.clientSecret;
//     }, [listBasket]);
//
//     const options = { fetchClientSecret };
//
//     useEffect(() => {
//         const user = useSelector((store: any) => store.authenticate);
//         setUserState(user)
//
//         setFromLocalStorage("basket", setListBasket);
//         // setStripIdState(localStorage.getItem("id_stripe")!);
//     }, []);
//
//     if (listBasket.length === 0 || !userState?.id_stripe) return null;
//
//     const generateStripeId = async () =>{
//         const userById = await apiGet(`${UserUrlWithPort}/${userState.id}`);
//         const stripeResponse = await apiPost(`${FacturationUrlWithPort}/customer/create`, userById);
//         const stripe_id = stripeResponse.id;
//         await apiPatch(`${UserUrlWithPort}/stripe-user/${userState.id}/${stripe_id}`);
//         dispatch(updateStripeId(stripe_id));
//     }
//
//     return (
//         <>
//             {userState.id_stripe === STRIPE_DETECTION.NONE_USER &&
//                 <Button onClick={generateStripeId}>Generer </Button> }
//             {userState.id_stripe !== STRIPE_DETECTION.NONE_USER &&
//                 <Grid id="checkout">
//                     <Button sx={{ marginLeft: "50px", marginTop: "50px" }} onClick={() => nav(`/${URL_FRONT.BASKET}`)}>
//                         <KeyboardBackspaceIcon color="secondary" />
//                         <Typography color="black">Retour au panier</Typography>
//                     </Button>
//                     <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//                         <EmbeddedCheckout />
//                     </EmbeddedCheckoutProvider>
//                 </Grid>
//             }
//         </>
//     );
// };

// _------------------------
// _------------------------
// _------------------------
// _------------------------

//
// const stripePromise = loadStripe("pk_test_6YIhM0UXA4RMmJKovWtLYyJb");
//
// export const EmbeddedCheckout = () => {
//     const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
//     const id_stripe = "cus_RdjIn2yT1Axy9h"
//     // const id_stripe = localStorage.getItem("id_stripe") || "";
//     // const { id_stripe,userId } = useSelector((store: any) => store.authenticate);
//
//     const nav = useNavigate();
//     useEffect(() => {
//         setFromLocalStorage("basket", setListBasket);
//     }, []);
//
//     const fetchClientSecret = useCallback(async () => {
//         const data = await apiPost(`${FacturationUrlWithPort}/checkout/create/${id_stripe}`, listBasket);
//         return data.clientSecret;
//     }, [listBasket]);
//
//     const options = { fetchClientSecret };
//
//
//     if (listBasket.length === 0 || !id_stripe) return null;
//
//     return (
//         <Grid id="checkout">
//             <Button sx={{ marginLeft: "50px", marginTop: "50px" }} onClick={() => nav(`/${URL_FRONT.BASKET}`)}>
//                 <KeyboardBackspaceIcon color="secondary" />
//                 <Typography color="black">Retour au panier</Typography>
//             </Button>
//             <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//                 <EmbeddedCheckout />
//             </EmbeddedCheckoutProvider>
//         </Grid>
//     );
// };

// //
// // export const PaymentPageGeneration = () => {
// //     const { id_stripe,userId } = useSelector((store: any) => store.authenticate);
// //     const dispatch = useAppDispatch();
// //     // userId: undefined,
// //     //     id_stripe: undefined,
// //
// //     // if (!userId && !id_stripe) return <p>Vous devez vous identifier avant de proceder au paiement</p>;
// //
// //
// //     const createStripeUser = async ()=>{
// //         const userById =  await apiGet(`${UserUrlWithPort}/${userId}`)
// //
// //         const stripeResponse = await apiPost(`${FacturationUrlWithPort}/customer/create`, userById)
// //         const stripe_id = stripeResponse.id;
// //         await apiPatch(`${UserUrlWithPort}/stripe-user/${userId}/${stripe_id}`)
// //         dispatch(updateStripeId(stripe_id))
// //         console.log(id_stripe)
// //     }
// //
// //     return(
// //         <>
// //             {/*{id_stripe === STRIPE_DETECTION.NONE_USER ?*/}
// //                 <Button onClick={createStripeUser}>Creer un profile de facturation</Button>
// //                 {/*:*/}
// //                 {/*<EmbeddedCheckout/>*/}
// //             {/*}*/}
// //         </>
// //     )
// //
// // };
// //
//
//
//
// export const EmbeddedCheckout = () => {
//     const { id_stripe,userId } = useSelector((store: any) => store.authenticate);
//     const dispatch = useAppDispatch();
//     // userId: undefined,
//     //     id_stripe: undefined,
//
//     // if (!userId && !id_stripe) return <p>Vous devez vous identifier avant de proceder au paiement</p>;
//
//     const [listBasket, setListBasket] = useState<ListBasketType[]>([]);
//     // const id_stripe = localStorage.getItem("id_stripe") || "";
//     const nav = useNavigate();
//
//     const fetchClientSecret = useCallback(async () => {
//         const data = await apiPost(`${FacturationUrlWithPort}/checkout/create/${id_stripe}`, listBasket);
//         return data.clientSecret;
//     }, [listBasket]);
//
//     const options = { fetchClientSecret };
//
//     useEffect(() => {
//         setFromLocalStorage("basket", setListBasket);
//     }, []);
//
//     if (listBasket.length === 0 || !id_stripe) return null;
//
//
//     const createStripeUser = async ()=>{
//         const userById =  await apiGet(`${UserUrlWithPort}/${userId}`)
//
//         const stripeResponse = await apiPost(`${FacturationUrlWithPort}/customer/create`, userById)
//         const stripe_id = stripeResponse.id;
//         await apiPatch(`${UserUrlWithPort}/stripe-user/${userId}/${stripe_id}`)
//         dispatch(updateStripeId(stripe_id))
//         console.log(id_stripe)
//     }
//
//     return(
//         <>
//             {/*{id_stripe === STRIPE_DETECTION.NONE_USER ?*/}
//             {/*<Button onClick={createStripeUser}>Creer un profile de facturation</Button>*/}
//             {/*:*/}
//                 <Grid id="checkout">
//                     <Button sx={{ marginLeft: "50px", marginTop: "50px" }} onClick={() => nav(`/${URL_FRONT.BASKET}`)}>
//                         <KeyboardBackspaceIcon color="secondary" />
//                         <Typography color="black">Retour au panier</Typography>
//                     </Button>
//                     <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//                         <EmbeddedCheckout />
//                     </EmbeddedCheckoutProvider>
//                 </Grid>
//             {/*}*/}
//         </>
//     )
//
// };