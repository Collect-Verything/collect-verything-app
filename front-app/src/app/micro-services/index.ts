import { MicroServiceUrlPortType } from "./type";

/*
 * Here you can find ports of all micro-services.
 * */

export const AUTH_SERVICE: MicroServiceUrlPortType = { servicePath: "auth", port: 3001 };
export const AuthUrlWithPort = `${AUTH_SERVICE.port}/${AUTH_SERVICE.servicePath}`;

export const USER_SERVICE: MicroServiceUrlPortType = { servicePath: "users", port: 3001 };
export const UserUrlWithPort = `${USER_SERVICE.port}/${USER_SERVICE.servicePath}`;
