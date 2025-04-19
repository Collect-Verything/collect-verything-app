export const configEnv = {
  DOMAIN: process.env.DOMAIN,

  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,

  FRONT_PORT: process.env.FRONT_PORT,

  AUTH_PORT: process.env.AUTH_PORT,
  AUTH_URL_AUTH: process.env.AUTH_URL_AUTH,
  AUTH_URL_ROLES: process.env.AUTH_URL_ROLES,
  AUTH_URL_USERS: process.env.AUTH_URL_USERS,

  FORGOT_PASSWORD_PATTERN: process.env.FORGOT_PASSWORD_PATTERN,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EMAIL_QUEUE: process.env.EMAIL_QUEUE,
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
      `🚨 Missing environment variables in AUTH SERVICE:\n→ ${listUndefinedValue.join('\n→ ')}`
    );
  }

  console.log('✅ All required env variables are defined.');
};
