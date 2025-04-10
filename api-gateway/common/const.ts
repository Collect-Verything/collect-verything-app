import { configEnv } from '../env-config';

export const freePath = ['login', 'register', 'forgot-password'];

export const portByPath = new Map<string, string>();
portByPath.set(configEnv.AUTH_URL_AUTH, configEnv.AUTH_PORT);
portByPath.set(configEnv.AUTH_URL_ROLES, configEnv.AUTH_PORT);
portByPath.set(configEnv.AUTH_URL_USERS, configEnv.AUTH_PORT);
portByPath.set(configEnv.PRODUCT_URL, configEnv.PRODUCT_PORT);
portByPath.set(configEnv.FACTURATION_URL, configEnv.FACTURATION_PORT);
portByPath.set(configEnv.CONFIG_URL, configEnv.CONFIG_PORT);

export const domainServiceByPath = new Map<string, string>();
domainServiceByPath.set(configEnv.AUTH_URL_AUTH, configEnv.DOMAIN_AUTH);
domainServiceByPath.set(configEnv.AUTH_URL_ROLES, configEnv.DOMAIN_AUTH);
domainServiceByPath.set(configEnv.AUTH_URL_USERS, configEnv.DOMAIN_AUTH);
domainServiceByPath.set(configEnv.PRODUCT_URL, configEnv.DOMAIN_PRODUCT);
domainServiceByPath.set(configEnv.FACTURATION_URL, configEnv.DOMAIN_FACTURATION,);
domainServiceByPath.set(configEnv.CONFIG_URL, configEnv.DOMAIN_CONFIG);
