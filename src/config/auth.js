import dotenv from 'dotenv'

dotenv.config();

export default {
    jwt: {
        secret: process.env.JWT_SECRET || 'expense_api_super_secret_2026',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }
}

