import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { ListBasketType } from "../shop/boutique/type";

/**
 * ==========================================================================
 * Redux Slice - Basket
 * ==========================================================================
 *
 * Gère l’état du **panier** côté front.
 * Appuie-toi sur **Redux Toolkit** pour centraliser :
 *   1. les effets de bord liés au stockage (localStorage pour l’instant) via
 *      `createAsyncThunk`,
 *   2. la mutation d’état immuable via `createSlice`.
 *
 * Objectifs :
 * - Initialiser le panier depuis le navigateur au chargement de l’app
 * - Ajouter un ou plusieurs articles
 * - Supprimer un article donné ou vider entièrement le panier
 * - Conserver — puis exposer — le compteur d’articles
 *
 * Effets de bord actuels :
 * Le panier est persisté **localement** (clé `basket`).
 * Lorsque la logique passera sur une API distante, il suffira de
 * remplacer le contenu des thunks sans toucher aux reducers ni aux
 * composants.
 *
 * Méthodes exposées (thunks) :
 * - `countBasketItems`      : lit localStorage → renvoie le nombre d’articles
 * - `addBasketItems`        : ajoute `quantity` articles et renvoie la liste complète
 * - `deleteBasketItems`     : vide totalement le panier
 * - `deleteBasketItem`      : remplace le panier par une nouvelle liste (suppression ciblée)
 * - `initBasketItems`       : hydrate l’état à partir du stockage au boot
 *
 * Reducers synchrones :
 * - `setCount`              : force manuellement le compteur (fallback/debug)
 *
 * Sélecteurs :
 * - `getBasketCount`        : nombre total d’articles
 * - `getBasketList`         : contenu détaillé du panier
 *
 * Hook utilitaire :
 * - `useAppDispatch`        : version typée de `useDispatch` pour l’app
 *
 * NOTE : Chaque thunk renvoie un **payload** (nouvelle liste ou compteur)
 *        utilisé dans `extraReducers` pour tenir l’UI à jour instantanément.
 */

export const useAppDispatch = () => useDispatch<AppDispatch>();

interface BasketState {
    count: number;
    list: ListBasketType[];
}

const initialState: BasketState = { count: 0, list: [] };

export const countBasketItems = createAsyncThunk<number>("basket/countBasketItems", async () => {
    if (typeof window === "undefined") return 0;
    const raw = localStorage.getItem("basket");
    try {
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
        return 0;
    }
});

export const addBasketItems = createAsyncThunk<ListBasketType[], ListBasketType>(
    "basket/addBasketItems",
    async ({ product, quantity, paidFrequency }) => {
        if (typeof window === "undefined") return [];

        const existing: ListBasketType[] = JSON.parse(localStorage.getItem("basket") || "[]");

        const itemsToAdd: ListBasketType[] = Array.from({ length: quantity }, () => ({
            product,
            paidFrequency,
            quantity,
        }));

        const updated = [...existing, ...itemsToAdd];
        localStorage.setItem("basket", JSON.stringify(updated));

        return updated;
    },
);

export const deleteAllBasketItems = createAsyncThunk("basket/deleteBasketItems", async () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("basket");
});

export const deleteBasketItem = createAsyncThunk<ListBasketType[], ListBasketType[]>(
    "basket/deleteBasketItem",
    async (updatedBasket) => {
        if (typeof window === "undefined") return [];
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
        return updatedBasket;
    },
);

export const initBasketItems = createAsyncThunk<ListBasketType[]>("basket/initBasketItems", async () => {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem("basket");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
});

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // compteur simple
            .addCase(countBasketItems.fulfilled, (state, action) => {
                state.count = action.payload;
            })
            // ajout
            .addCase(addBasketItems.fulfilled, (state, action) => {
                state.list = action.payload;
                state.count = action.payload.length;
            })
            // reset complet
            .addCase(deleteAllBasketItems.fulfilled, (state) => {
                state.list = [];
                state.count = 0;
            })
            // suppression ciblée
            .addCase(deleteBasketItem.fulfilled, (state, action) => {
                state.list = action.payload;
                state.count = action.payload.length;
            })
            // init depuis localStorage
            .addCase(initBasketItems.fulfilled, (state, action) => {
                state.list = action.payload;
                state.count = action.payload.length;
            });
    },
});

export const getBasketCount = (state: RootState) => state.basket.count;
export const getBasketList = (state: RootState) => state.basket.list;
export const { setCount } = basketSlice.actions;
export default basketSlice.reducer;
