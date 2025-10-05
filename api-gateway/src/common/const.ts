// Path with no rules
export const freePath = ['login', 'register', 'forgot-password'];

//  Path Endpoint : Port service expose
export const portByPath = new Map<string, string>();
portByPath.set('auth', '3001');
portByPath.set('roles', '3001');
portByPath.set('users', '3001');
portByPath.set('product', '3002');
portByPath.set('stripe', '3003');
portByPath.set('subscription', '3004');
portByPath.set('delivery', '3005');

//  Path Endpoint : Domain container name
export const domainServiceByPath = new Map<string, string>();
domainServiceByPath.set('auth', 'auth-service');
domainServiceByPath.set('roles', 'auth-service');
domainServiceByPath.set('users', 'auth-service');
domainServiceByPath.set('product', 'product-service');
domainServiceByPath.set('stripe', 'facturation-service');
domainServiceByPath.set('subscription', 'config-service');
domainServiceByPath.set('delivery', 'delivery-service');
