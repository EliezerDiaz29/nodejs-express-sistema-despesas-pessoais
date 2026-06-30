import { Expense } from '../models/expenseModels.js';
import { Category } from '../models/CategoryModel.js';
import sequelize from '../models/database.js';
import apiResponse from '../views/ApiResponse.js';

// TOTAL EXPENSES
async function totalExpenses(req, res, next) {
    try {
        const total = await Expense.sum('amount', {
            where: { userId: req.user.id }
        });

        return apiResponse.success(
            res,
            { total: total || 0 },
            'Total expenses retrieved successfully'
        );

    } catch (error) {
        next(error);
    }
}

// EXPENSES COUNT
async function expensesCount(req, res, next) {
    try {
        const count = await Expense.count({
            where: { userId: req.user.id }
        });

        return apiResponse.success(
            res,
            { count },
            'Expenses count retrieved successfully'
        );

    } catch (error) {
        next(error);
    }
}

// EXPENSES BY CATEGORY
async function expensesByCategory(req, res, next) {
    try {
        const result = await Expense.findAll({
            where: { userId: req.user.id },
            attributes: [
                [sequelize.fn('SUM', sequelize.col('amount')), 'total']
            ],
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ],
            group: ['category.id', 'category.name']
        });

        const formatted = result.map(item => ({
            category: item.category.name,
            total: Number(item.dataValues.total)
        }));

        return apiResponse.success(
            res,
            formatted,
            'Expenses by category retrieved successfully'
        );

    } catch (error) {
        next(error);
    }
}

export default {
    totalExpenses,
    expensesCount,
    expensesByCategory
};