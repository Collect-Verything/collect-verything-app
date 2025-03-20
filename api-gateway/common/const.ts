export const freePath = ['login', 'register'];
// export const checkTokenPath = 'http://localhost:3001/auth/validate-token';
export const portByPath = new Map<string, string>();
portByPath.set('auth', '3001');
portByPath.set('roles', '3001');
portByPath.set('users', '3001');
portByPath.set('products', '3002');
portByPath.set('stripe', '3003');
portByPath.set('config', '3004');
//
// portByPath.set(configEnv.AUTH_URL_AUTH, configEnv.AUTH_PORT);
// portByPath.set(configEnv.AUTH_URL_ROLES, configEnv.AUTH_PORT);
// portByPath.set(configEnv.AUTH_URL_USERS, configEnv.AUTH_PORT);
// portByPath.set(configEnv.PRODUCT_URL,configEnv.PRODUCT_PORT);
// portByPath.set(configEnv.FACTURATION_URL, configEnv.FACTURATION_PORT);
// portByPath.set(configEnv.CONFIG_URL,configEnv.CONFIG_PORT);
