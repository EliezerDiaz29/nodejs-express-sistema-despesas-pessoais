import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import authConfig from '../config/auth.js';
import apiResponse from '../views/ApiResponse.js';

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        authConfig.jwt.secret,
        {
            expiresIn: authConfig.jwt.expiresIn
        }
    );
}

// REGISTER
async function register(req, res, next) {
    try {
        const { nameUser, email, password } = req.body;

        if (!nameUser?.trim() || !email?.trim() || !password?.trim()) {
            return apiResponse.validationError(
                res,
                ['nameUser, email and password are required']
            );
        }

        const existingUser = await userModel.getUserByEmail(email);

        if (existingUser) {
            return apiResponse.validationError(
                res,
                ['Email already in use']
            );
        }

        const user = await userModel.createUser(nameUser, email, password);

        const token = generateToken(user);

        return apiResponse.created(
            res,
            {
                token,
                user: {
                    id: user.id,
                    nameUser: user.nameUser,
                    email: user.email
                }
            },
            'User created successfully'
        );

    } catch (error) {
        next(error);
    }
}

// LOGIN
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password?.trim()) {
            return apiResponse.validationError(
                res,
                ['Email and password are required']
            );
        }

        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return apiResponse.unauthorized(
                res,
                'Invalid credentials'
            );
        }

        const isValidPassword = await userModel.checkPassword(
            password,
            user.password
        );

        if (!isValidPassword) {
            return apiResponse.unauthorized(
                res,
                'Invalid credentials'
            );
        }

        const token = generateToken(user);

        return apiResponse.success(
            res,
            {
                token,
                user: {
                    id: user.id,
                    nameUser: user.nameUser,
                    email: user.email
                }
            },
            'Login successful'
        );

    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login
};