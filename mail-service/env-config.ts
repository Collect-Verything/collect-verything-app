export const configEnv = {
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
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
      `🚨 Missing environment variables in MAIL SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`
    );
  }

  console.log('✅ All required env variables are defined.');
};
