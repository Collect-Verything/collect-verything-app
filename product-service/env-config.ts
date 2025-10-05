export const configEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
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
      `🚨 Missing environment variables in PRODUCT SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`
    );
  }

  console.log('✅ All required env variables are defined.');
};
