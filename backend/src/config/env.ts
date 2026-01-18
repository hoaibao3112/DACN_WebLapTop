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
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_URL: string;
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
    FACEBOOK_CALLBACK_URL: string;
    // VNPay
    VNP_TMN_CODE: string;
    VNP_HASH_SECRET: string;
    VNP_URL: string;
    VNP_RETURN_URL: string;
    VNP_IPN_URL: string;
    // MoMo
    MOMO_PARTNER_CODE: string;
    MOMO_ACCESS_KEY: string;
    MOMO_SECRET_KEY: string;
    MOMO_API_URL: string;
    MOMO_REDIRECT_URL: string;
    MOMO_IPN_URL: string;
    // ZaloPay
    ZALOPAY_APP_ID: string;
    ZALOPAY_KEY1: string;
    ZALOPAY_KEY2: string;
    ZALOPAY_ENDPOINT: string;
    ZALOPAY_IPN_URL: string;
    // Frontend
    FRONTEND_URL: string;
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
    GOOGLE_CLIENT_ID: getEnvVariable('GOOGLE_CLIENT_ID'),
    GOOGLE_CLIENT_SECRET: getEnvVariable('GOOGLE_CLIENT_SECRET'),
    GOOGLE_CALLBACK_URL: getEnvVariable('GOOGLE_CALLBACK_URL', 'http://localhost:5000/api/auth/google/callback'),
    FACEBOOK_CLIENT_ID: getEnvVariable('FACEBOOK_CLIENT_ID'),
    FACEBOOK_CLIENT_SECRET: getEnvVariable('FACEBOOK_CLIENT_SECRET'),
    FACEBOOK_CALLBACK_URL: getEnvVariable('FACEBOOK_CALLBACK_URL'),
    // VNPay
    VNP_TMN_CODE: getEnvVariable('VNP_TMN_CODE'),
    VNP_HASH_SECRET: getEnvVariable('VNP_HASH_SECRET'),
    VNP_URL: getEnvVariable('VNP_URL'),
    VNP_RETURN_URL: getEnvVariable('VNP_RETURN_URL'),
    VNP_IPN_URL: getEnvVariable('VNP_IPN_URL'),
    // MoMo
    MOMO_PARTNER_CODE: getEnvVariable('MOMO_PARTNER_CODE'),
    MOMO_ACCESS_KEY: getEnvVariable('MOMO_ACCESS_KEY'),
    MOMO_SECRET_KEY: getEnvVariable('MOMO_SECRET_KEY'),
    MOMO_API_URL: getEnvVariable('MOMO_API_URL'),
    MOMO_REDIRECT_URL: getEnvVariable('MOMO_REDIRECT_URL'),
    MOMO_IPN_URL: getEnvVariable('MOMO_IPN_URL'),
    // ZaloPay
    ZALOPAY_APP_ID: getEnvVariable('ZALOPAY_APP_ID'),
    ZALOPAY_KEY1: getEnvVariable('ZALOPAY_KEY1'),
    ZALOPAY_KEY2: getEnvVariable('ZALOPAY_KEY2'),
    ZALOPAY_ENDPOINT: getEnvVariable('ZALOPAY_ENDPOINT'),
    ZALOPAY_IPN_URL: getEnvVariable('ZALOPAY_IPN_URL'),
    // Frontend
    FRONTEND_URL: getEnvVariable('FRONTEND_URL', 'http://localhost:3000'),
};
