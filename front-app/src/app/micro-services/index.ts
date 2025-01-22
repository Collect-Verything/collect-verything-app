import { MicroServiceUrlPortType } from "./type";
/*
 * Here you can find ports and url's of all micro-services.
 */

export const AUTH_SERVICE: MicroServiceUrlPortType = { servicePath: "auth", port: 3001 };
export const AuthUrlWithPort = `${AUTH_SERVICE.port}/${AUTH_SERVICE.servicePath}`;

export const USER_SERVICE: MicroServiceUrlPortType = { servicePath: "users", port: 3001 };
export const UserUrlWithPort = `${USER_SERVICE.port}/${USER_SERVICE.servicePath}`;

export const PRODUCT_SERVICE: MicroServiceUrlPortType = { servicePath: "products", port: 3002 };
export const ProductUrlWithPort = `${PRODUCT_SERVICE.port}/${PRODUCT_SERVICE.servicePath}`;

export const FACTURATION_SERVICE: MicroServiceUrlPortType = { servicePath: "", port: 3003 };
export const FacturationUrlWithPort = `${FACTURATION_SERVICE.port}/${FACTURATION_SERVICE.servicePath}`;
