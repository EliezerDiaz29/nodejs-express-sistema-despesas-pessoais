import expenseModel from '../models/expenseModels.js';
import apiResponse from '../views/ApiResponse.js';

// LIST
async function list(req, res, next) {
    try {
        const {
            categoryId,
            status,
            startDate,
            endDate,
            minAmount,
            maxAmount
        } = req.query;

        const data = await expenseModel.findAll({
            userId: req.user.id,
            categoryId,
            status,
            startDate,
            endDate,
            minAmount,
            maxAmount
        });

        return apiResponse.success(
            res,
            data,
            'Expenses retrieved successfully'
        );

    } catch (error) {
        next(error);
    }
}

// GET BY ID
async function getById(req, res, next) {
    try {
        const data = await expenseModel.findById(
            req.params.id,
            req.user.id
        );

        if (!data) {
            return apiResponse.notFound(res);
        }

        return apiResponse.success(
            res,
            data,
            'Expense retrieved successfully'
        );

    } catch (error) {
        next(error);
    }
}

// CREATE
async function create(req, res, next) {
    try {
        const payload = {
            ...req.body,
            userId: req.user.id
        };

        const errors = expenseModel.validateCreate(payload);

        if (errors.length) {
            return apiResponse.validationError(res, errors);
        }

        const created = await expenseModel.create(payload);

        return apiResponse.created(
            res,
            created,
            'Expense created successfully'
        );

    } catch (error) {
        next(error);
    }
}

// UPDATE
async function update(req, res, next) {
    try {
        const errors = expenseModel.validateUpdate(req.body);

        if (errors.length) {
            return apiResponse.validationError(res, errors);
        }

        const updated = await expenseModel.update(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!updated) {
            return apiResponse.notFound(res);
        }

        return apiResponse.success(
            res,
            updated,
            'Expense updated successfully'
        );

    } catch (error) {
        next(error);
    }
}

// DELETE
async function remove(req, res, next) {
    try {
        const removed = await expenseModel.remove(
            req.params.id,
            req.user.id
        );

        if (!removed) {
            return apiResponse.notFound(res);
        }

        return apiResponse.removed(
            res,
            'Expense deleted successfully'
        );

    } catch (error) {
        next(error);
    }
}

export default {
    list,
    getById,
    create,
    update,
    remove
};