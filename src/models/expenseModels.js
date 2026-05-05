const expenses = [];
let nextId = 1;

// GET ALL
function findAll() {
    return expenses;
}

// GET BY ID
function findById(id) {
    return expenses.find(e => e.id === id) || null;
}

// VALIDATION CREATE
function validateCreate(data) {
    const errors = [];

    if (!data.title?.trim()) errors.push('title is required');
    if (!data.amount || data.amount <= 0) errors.push('amount must be greater than 0');
    if (!data.date || new Date(data.date) > new Date()) errors.push('date cannot be in the future');

    return errors;
}

// VALIDATION UPDATE
function validateUpdate(data) {
    const errors = [];

    if (data.title !== undefined && !data.title.trim()) {
        errors.push('title cannot be empty');
    }

    if (data.amount !== undefined && data.amount <= 0) {
        errors.push('amount must be greater than 0');
    }

    if (data.date !== undefined && new Date(data.date) > new Date()) {
        errors.push('date cannot be in the future');
    }

    return errors;
}

// CREATE
function create(data) {
    const expense = {
        id: 'exp_' + nextId++,
        title: data.title,
        amount: data.amount,
        category: data.category,
        date: data.date,
        description: data.description || '',
        createdAt: new Date().toISOString()
    };

    expenses.push(expense);
    return expense;
}

// UPDATE
function update(id, data) {
    const expense = findById(id);
    if (!expense) return null;

    delete data.id;
    Object.assign(expense, data);

    return expense;
}

// DELETE
function remove(id) {
    const index = expenses.findIndex(e => e.id === id);
    if (index === -1) return false;

    expenses.splice(index, 1);
    return true;
}

// TOTAL
function calculateTotal(list) {
    return list.reduce((sum, e) => sum + e.amount, 0);
}

// GROUP BY CATEGORY
function groupByCategory(list) {
    return list.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {});
}

export default {
    findAll,
    findById,
    validateCreate,
    validateUpdate,
    create,
    update,
    remove,
    calculateTotal,
    groupByCategory
};