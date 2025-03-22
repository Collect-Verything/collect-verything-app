import {configEnv} from "../env-config";

// TODO : Import .env value

export const freePath = ['login', 'register'];
// export const checkTokenPath = 'http://localhost:3001/auth/validate-token';
export const portByPath = new Map<string, string>();
portByPath.set(configEnv.AUTH_URL_AUTH, configEnv.AUTH_PORT);
portByPath.set(configEnv.AUTH_URL_ROLES, configEnv.AUTH_PORT);
portByPath.set(configEnv.AUTH_URL_USERS, configEnv.AUTH_PORT);
portByPath.set(configEnv.PRODUCT_URL, configEnv.PRODUCT_PORT);
portByPath.set(configEnv.FACTURATION_URL, configEnv.FACTURATION_PORT);
portByPath.set(configEnv.CONFIG_URL, configEnv.CONFIG_PORT);

const domainService = new Map()
domainService.set("auth", configEnv.DOMAIN_AUTH);
domainService.set("product", configEnv.DOMAIN_PRODUCT);
export const getDomain = (firstPath: string) =>{
    return domainService.get(firstPath)
}
