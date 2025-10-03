export const configEnv = {
  DOMAIN: process.env.DOMAIN,

  DATABASE_URL: process.env.DATABASE_URL,

  FRONT_PORT: process.env.FRONT_PORT,

  DELIVERY_PORT: process.env.DELIVERY_PORT,
  DELIVERY_URL: process.env.DELIVERY_URL,
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
      `🚨 Missing environment variables in DELIVERY SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`
    );
  }

  console.log('✅ All required env variables are defined.');
};
