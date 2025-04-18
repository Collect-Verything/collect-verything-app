export const configEnv = {
  DOMAIN: process.env.DOMAIN,

  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,

  PRODUCT_PORT: process.env.PRODUCT_PORT,
  PRODUCT_URL: process.env.PRODUCT_URL,
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
    throw new Error(`🚨 Missing environment variables in PRODUCT SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`);
  }

  console.log('✅ All required env variables are defined.');
};
