import dotenv from "dotenv";

dotenv.config();

export interface Environment {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRATION: string;
    REFRESH_TOKEN_EXPIRATION: string;
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    GMAIL_APP_PASSWORD: string;
    GMAIL_USER_EMAIL: string;
    SENTRY_DSN: string;
    FRONTEND_URL: string;
}

function getEnvVariable(key: string, defaultValue?: string): string {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}

export const env: Environment = {
    PORT: parseInt(getEnvVariable("PORT", "3000")),
    NODE_ENV: getEnvVariable("NODE_ENV", "development"),
    DATABASE_URL: getEnvVariable("DATABASE_URL"),
    ACCESS_TOKEN_SECRET: getEnvVariable("ACCESS_TOKEN_SECRET"),
    REFRESH_TOKEN_SECRET: getEnvVariable("REFRESH_TOKEN_SECRET"),
    ACCESS_TOKEN_EXPIRATION: getEnvVariable("ACCESS_TOKEN_EXPIRATION", "15m"),
    REFRESH_TOKEN_EXPIRATION: getEnvVariable("REFRESH_TOKEN_EXPIRATION", "7d"),
    REDIS_URL: getEnvVariable("REDIS_URL"),
    GMAIL_APP_PASSWORD: getEnvVariable("GMAIL_APP_PASSWORD"),
    GMAIL_USER_EMAIL: getEnvVariable("GMAIL_USER_EMAIL"),
    SENTRY_DSN: getEnvVariable("SENTRY_DSN"),
    FRONTEND_URL: getEnvVariable("FRONTEND_URL"),
    JWT_ISSUER: getEnvVariable("JWT_ISSUER"),
    JWT_AUDIENCE: getEnvVariable("JWT_AUDIENCE"),
};
