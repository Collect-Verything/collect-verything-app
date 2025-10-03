export const configEnv = {
  DATABASE_URL: process.env.DATABASE_URL,

  DOMAIN: process.env.DOMAIN,

  FRONT_PORT: process.env.FRONT_PORT,

  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,

  FACTURATION_PORT: process.env.FACTURATION_PORT,
  FACTURATION_URL: process.env.FACTURATION_URL,

  STRIPE_API_KEY: process.env.STRIPE_API_KEY,
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
      `🚨 Missing environment variables in FACTURATION SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`
    );
  }

  console.log('✅ All required env variables are defined.');
};
