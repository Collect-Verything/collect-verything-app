import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { ListBasketType } from "../shop/boutique/type";

/**
 * ==========================================================================
 * Redux Slice – Basket
 * ==========================================================================
 *
 * Gère l’état du **panier** directement dans le store Redux (plus de
 * persistance locale ni d’appels asynchrones).
 *
 * Objectifs :
 * - Ajouter un ou plusieurs articles au panier
 * - Supprimer un article précis (par son index)
 * - Vider entièrement le panier
 * - Conserver, puis exposer, le compteur d’articles
 *
 * Implémentation :
 * Tout est désormais **synchrone** : une liste `list` stocke les items,
 * le compteur `count` est maintenu en temps réel par les reducers.
 *
 * Reducers synchrones :
 * - `addBasketItems`        : pousse un nouvel article dans `list`, incrémente `count`
 * - `deleteBasketItem`      : retire l’élément d’index `payload`, décrémente `count`
 * - `deleteAllBasketItems`  : réinitialise `list` et `count`
 *
 * Sélecteur :
 * - `getBasket`             : renvoie l’objet complet `{ count, list }`
 *
 * Hook utilitaire :
 * - `useAppDispatch`        : version typée de `useDispatch` pour l’application
 *
 */

export const useAppDispatch = () => useDispatch<AppDispatch>();

interface BasketState {
    count: number;
    list: ListBasketType[];
}

const initialState: BasketState = { count: 0, list: [] };

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        deleteAllBasketItems: (state) => {
            state.list = [];
            state.count = 0;
        },
        deleteBasketItem: (state, action) => {
            state.list.splice(action.payload, 1);
            state.count--;
        },
        addBasketItems: (state, action) => {
            state.list.push(action.payload);
            state.count++;
        },
    },
});

export const getBasket = (state: RootState) => state.basket;
export const { deleteAllBasketItems, deleteBasketItem, addBasketItems } = basketSlice.actions;
export default basketSlice.reducer;
