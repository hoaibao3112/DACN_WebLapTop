import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    NODE_ENV: string;
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_EXPIRES_IN: string;
    CORS_ORIGIN: string;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

export const env: EnvConfig = {
    NODE_ENV: getEnvVariable('NODE_ENV', 'development'),
    PORT: parseInt(getEnvVariable('PORT', '5000'), 10),
    DB_HOST: getEnvVariable('DB_HOST'),
    DB_PORT: parseInt(getEnvVariable('DB_PORT', '3306'), 10),
    DB_NAME: getEnvVariable('DB_NAME'),
    DB_USER: getEnvVariable('DB_USER'),
    DB_PASSWORD: getEnvVariable('DB_PASSWORD'),
    JWT_SECRET: getEnvVariable('JWT_SECRET'),
    JWT_REFRESH_SECRET: getEnvVariable('JWT_REFRESH_SECRET'),
    JWT_EXPIRES_IN: getEnvVariable('JWT_EXPIRES_IN', '1h'),
    JWT_REFRESH_EXPIRES_IN: getEnvVariable('JWT_REFRESH_EXPIRES_IN', '7d'),
    CORS_ORIGIN: getEnvVariable('CORS_ORIGIN', 'http://localhost:3000'),
};
