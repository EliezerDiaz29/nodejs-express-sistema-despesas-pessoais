import express from 'express';
import dashboardController from '../controllers/dashboardController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/total-expenses', dashboardController.totalExpenses);
router.get('/expenses-count', dashboardController.expensesCount);
router.get('/expenses-by-category', dashboardController.expensesByCategory);

export default router;