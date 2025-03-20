import { MicroServiceUrlPortType } from "./type";
/*
 * Here you can find ports and url's of all micro-services.
 */

export const AUTH_SERVICE: MicroServiceUrlPortType = { servicePath: "auth", port: 3001 };
// export const AuthUrlWithPort = `${AUTH_SERVICE.port}/${AUTH_SERVICE.servicePath}`;
export const AuthUrlWithPort = `2999/${AUTH_SERVICE.servicePath}`;

export const USER_SERVICE: MicroServiceUrlPortType = { servicePath: "users", port: 3001 };
// export const UserUrlWithPort = `${USER_SERVICE.port}/${USER_SERVICE.servicePath}`;
export const UserUrlWithPort = `2999/${USER_SERVICE.servicePath}`;

export const PRODUCT_SERVICE: MicroServiceUrlPortType = { servicePath: "products", port: 3002 };
// export const ProductUrlWithPort = `${PRODUCT_SERVICE.port}/${PRODUCT_SERVICE.servicePath}`;
export const ProductUrlWithPort = `2999/${PRODUCT_SERVICE.servicePath}`;

export const FACTURATION_SERVICE: MicroServiceUrlPortType = { servicePath: "stripe", port: 3003 };
// export const FacturationUrlWithPort = `${FACTURATION_SERVICE.port}/${FACTURATION_SERVICE.servicePath}`;
export const FacturationUrlWithPort = `2999/${FACTURATION_SERVICE.servicePath}`;

export const CONFIG_SERVICE: MicroServiceUrlPortType = { servicePath: "config", port: 3004 };
// export const ConfigUrlWithPort = `${CONFIG_SERVICE.port}/${CONFIG_SERVICE.servicePath}`;
export const ConfigUrlWithPort = `2999/${CONFIG_SERVICE.servicePath}`;

// TODO : Trouver une solution pour get les valeurs .env en dehors du project front, dans le but de tous centraliser.
// export const AUTH_SERVICE: MicroServiceUrlPortType = { servicePath: String(configEnv.AUTH_URL_AUTH), port: Number(configEnv.AUTH_PORT) };
// export const AuthUrlWithPort = `${configEnv.API_GATEWAY_PORT}/${AUTH_SERVICE.servicePath}`;
//
// export const USER_SERVICE: MicroServiceUrlPortType = { servicePath: String(configEnv.AUTH_URL_USERS), port: Number(configEnv.AUTH_PORT) };
// export const UserUrlWithPort = `${configEnv.API_GATEWAY_PORT}/${USER_SERVICE.servicePath}`;
//
// export const PRODUCT_SERVICE: MicroServiceUrlPortType = { servicePath:  String(configEnv.PRODUCT_URL), port: Number(configEnv.PRODUCT_PORT) };
// export const ProductUrlWithPort = `${configEnv.API_GATEWAY_PORT}/${PRODUCT_SERVICE.servicePath}`;
//
// export const FACTURATION_SERVICE: MicroServiceUrlPortType = { servicePath:  String(configEnv.FACTURATION_URL), port: Number(configEnv.FACTURATION_PORT) };
// export const FacturationUrlWithPort = `${configEnv.API_GATEWAY_PORT}/${FACTURATION_SERVICE.servicePath}`;
//
// export const CONFIG_SERVICE: MicroServiceUrlPortType = { servicePath:  String(configEnv.CONFIG_URL), port:  Number(configEnv.CONFIG_PORT) };
// export const ConfigUrlWithPort = `${configEnv.API_GATEWAY_PORT}/${CONFIG_SERVICE.servicePath}`;
//


