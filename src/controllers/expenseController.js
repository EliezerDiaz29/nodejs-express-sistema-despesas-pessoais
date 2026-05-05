import expenseModel from '../models/expenseModels.js';
import expenseView from '../views/expenseViews.js';

// LIST
function list(req, res) {
    try {
        let data = expenseModel.findAll();

        const { category, startDate, endDate, summary, groupBy } = req.query;

        if (category) {
            data = data.filter(e => e.category === category);
        }

        if (startDate) {
            data = data.filter(e => new Date(e.date) >= new Date(startDate));
        }

        if (endDate) {
            data = data.filter(e => new Date(e.date) <= new Date(endDate));
        }

        if (summary === 'total') {
            return expenseView.success(res, {
                total: expenseModel.calculateTotal(data)
            });
        }

        if (groupBy === 'category') {
            return expenseView.success(res, expenseModel.groupByCategory(data));
        }

        return expenseView.success(res, data);

    } catch (error) {
        return expenseView.serverError(res, error.message);
    }
}

// GET BY ID
function getById(req, res) {
    try {
        const data = expenseModel.findById(req.params.id);

        if (!data) {
            return expenseView.notFound(res);
        }

        return expenseView.success(res, data);

    } catch (error) {
        return expenseView.serverError(res, error.message);
    }
}

// CREATE
function create(req, res) {
    try {
        const errors = expenseModel.validateCreate(req.body);

        if (errors.length) {
            return expenseView.validationError(res, errors);
        }

        const created = expenseModel.create(req.body);
        return expenseView.created(res, created);

    } catch (error) {
        return expenseView.serverError(res, error.message);
    }
}

// UPDATE
function update(req, res) {
    try {
        const errors = expenseModel.validateUpdate(req.body);

        if (errors.length) {
            return expenseView.validationError(res, errors);
        }

        const updated = expenseModel.update(req.params.id, req.body);

        if (!updated) {
            return expenseView.notFound(res);
        }

        return expenseView.success(res, updated);

    } catch (error) {
        return expenseView.serverError(res, error.message);
    }
}

// DELETE
function remove(req, res) {
    try {
        const ok = expenseModel.remove(req.params.id);

        if (!ok) {
            return expenseView.notFound(res);
        }

        return expenseView.removed(res);

    } catch (error) {
        return expenseView.serverError(res, error.message);
    }
}

export default {
    list,
    getById,
    create,
    update,
    remove
};