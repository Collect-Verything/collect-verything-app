export const configEnv = {
  DOMAIN: process.env.DOMAIN,

  FRONT_PORT: process.env.FRONT_PORT,

  CONFIG_PORT: process.env.CONFIG_PORT,
  CONFIG_URL: process.env.CONFIG_URL,
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
    throw new Error(`🚨 Missing environment variables in CONFIG SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`);
  }

  console.log('✅ All required env variables are defined.');
};
