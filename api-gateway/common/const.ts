export const freePath = ['login', 'register'];
// export const checkTokenPath = 'http://localhost:3001/auth/validate-token';
export const portByPath = new Map<string, string>();
portByPath.set('auth', '3001');
portByPath.set('roles', '3001');
portByPath.set('users', '3001');
portByPath.set('products', '3002');
portByPath.set('stripe', '3003');
portByPath.set('config', '3004');
