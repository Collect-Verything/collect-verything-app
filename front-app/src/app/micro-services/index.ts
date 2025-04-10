import { MicroServiceUrlPortType } from "./type";
/*
 * Here you can find ports and url's of all micro-services.
 */

// TODO : Trouver une solution pour get les valeurs .env en dehors du project front, dans le but de tous centraliser.
export const AUTH_SERVICE: MicroServiceUrlPortType = { servicePath: String(process.env.REACT_APP_AUTH_URL_AUTH), port: Number(process.env.REACT_APP_AUTH_PORT) };
export const AuthUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${AUTH_SERVICE.servicePath}`;

export const USER_SERVICE: MicroServiceUrlPortType = { servicePath: String(process.env.REACT_APP_AUTH_URL_USERS), port: Number(process.env.REACT_APP_AUTH_PORT) };
export const UserUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${USER_SERVICE.servicePath}`;

export const PRODUCT_SERVICE: MicroServiceUrlPortType = { servicePath:  String(process.env.REACT_APP_PRODUCT_URL), port: Number(process.env.REACT_APP_PRODUCT_PORT) };
export const ProductUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${PRODUCT_SERVICE.servicePath}`;

export const FACTURATION_SERVICE: MicroServiceUrlPortType = { servicePath:  String(process.env.REACT_APP_FACTURATION_URL), port: Number(process.env.REACT_APP_FACTURATION_PORT) };
export const FacturationUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${FACTURATION_SERVICE.servicePath}`;

export const CONFIG_SERVICE: MicroServiceUrlPortType = { servicePath:  String(process.env.REACT_APP_CONFIG_URL), port:  Number(process.env.REACT_APP_CONFIG_PORT) };
export const ConfigUrlWithPort = `${process.env.REACT_APP_API_GATEWAY_PORT}/${CONFIG_SERVICE.servicePath}`;



