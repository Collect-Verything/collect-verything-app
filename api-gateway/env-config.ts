export const configEnv = {
  // MAIN DOMAIN
  DOMAIN: process.env.DOMAIN,

  // FRONT APP
  FRONT_PORT: process.env.FRONT_PORT,

  // API GATEWAY
  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,

  // AUTHENTICATION
  DOMAIN_AUTH: process.env.DOMAIN_AUTH,

  AUTH_PORT: process.env.AUTH_PORT,
  AUTH_URL_AUTH: process.env.AUTH_URL_AUTH,
  AUTH_URL_ROLES: process.env.AUTH_URL_ROLES,
  AUTH_URL_USERS: process.env.AUTH_URL_USERS,

  // PRODUCT
  DOMAIN_PRODUCT: process.env.DOMAIN_PRODUCT,

  PRODUCT_PORT: process.env.PRODUCT_PORT,
  PRODUCT_URL: process.env.PRODUCT_URL,

  // FACTURATION
  DOMAIN_FACTURATION: process.env.DOMAIN_FACTURATION,

  FACTURATION_PORT: process.env.FACTURATION_PORT,
  FACTURATION_URL: process.env.FACTURATION_URL,

  // CONFIGURATION
  DOMAIN_CONFIG: process.env.DOMAIN_CONFIG,

  CONFIG_PORT: process.env.CONFIG_PORT,
  CONFIG_URL: process.env.CONFIG_URL,
};

export const checkEnvValue = () => {
  console.log('✅ Checking env variables...');

  const listUndefinedValue: string[] = [];

  Object.keys(configEnv).forEach((key) => {
    if (!configEnv[key as keyof typeof configEnv]) {
      listUndefinedValue.push(key);
    }
  });

  if (listUndefinedValue.length > 0) {
    throw new Error(
      `🚨 Missing environment variables in API GATEWAY:\n→ ${listUndefinedValue.join('\n→ ')}`
    );
  }

  console.log('✅ All required env variables are defined.');
};
