import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/users', authController.register);
router.post('/auth/login', authController.login);

export default router;