import { MicroServiceUrlPortType } from "./type";

/**
 * ============================================================
 * Microservices Configuration - Front-End Environment Mapping
 * ============================================================
 *
 * Ce fichier centralise les URL et ports des microservices
 * utilisés par l'application front-end.
 *
 * Chaque microservice est exposé via l'API Gateway.
 * Les valeurs sont récupérées à partir des variables d’environnement
 * (injectées via un fichier `.env` propre à React).
 *
 * 📌 Remarque : React ne peut accéder qu'aux variables d’environnement
 * préfixées par `REACT_APP_`.
 *
 * TODO :
 * ➤ Trouver une solution pour centraliser la gestion des `.env`
 * dans un projet monorepo (idéalement en-dehors du dossier front).
 */

// AUTHENTICATION SERVICE (login / register / validate-token)
export const AUTH_SERVICE: MicroServiceUrlPortType = {
    servicePath: String(process.env.REACT_APP_AUTH_URL_AUTH),
    port: Number(process.env.REACT_APP_AUTH_PORT),
};
export const AuthUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${AUTH_SERVICE.servicePath}`;

// USER SERVICE (CRUD des utilisateurs / rôles)
export const USER_SERVICE: MicroServiceUrlPortType = {
    servicePath: String(process.env.REACT_APP_AUTH_URL_USERS),
    port: Number(process.env.REACT_APP_AUTH_PORT),
};
export const UserUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${USER_SERVICE.servicePath}`;

// PRODUCT SERVICE (catalogue / publication / visibilité / stock)
export const PRODUCT_SERVICE: MicroServiceUrlPortType = {
    servicePath: String(process.env.REACT_APP_PRODUCT_URL),
    port: Number(process.env.REACT_APP_PRODUCT_PORT),
};
export const ProductUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${PRODUCT_SERVICE.servicePath}`;

// FACTURATION SERVICE (checkout / factures / événements Stripe)
export const FACTURATION_SERVICE: MicroServiceUrlPortType = {
    servicePath: String(process.env.REACT_APP_FACTURATION_URL),
    port: Number(process.env.REACT_APP_FACTURATION_PORT),
};
export const FacturationUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${FACTURATION_SERVICE.servicePath}`;

// CONFIG SERVICE (abonnement / configuration de site / publication)
export const CONFIG_SERVICE: MicroServiceUrlPortType = {
    servicePath: String(process.env.REACT_APP_CONFIG_URL),
    port: Number(process.env.REACT_APP_CONFIG_PORT),
};
export const ConfigUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${CONFIG_SERVICE.servicePath}`;
