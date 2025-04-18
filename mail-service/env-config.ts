export const configEnv = {
  EMAIL_MESSAGE_BROKER: process.env.EMAIL_MESSAGE_BROKER,
  PASSWORD_MESSAGE_BROKER: process.env.PASSWORD_MESSAGE_BROKER,
  EMAIL_QUEUE: process.env.EMAIL_QUEUE,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  FORGOT_PASSWORD_PATTERN: process.env.FORGOT_PASSWORD_PATTERN,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
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
    throw new Error(`🚨 Missing environment variables in MAIL SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`);
  }

  console.log('✅ All required env variables are defined.');
};
