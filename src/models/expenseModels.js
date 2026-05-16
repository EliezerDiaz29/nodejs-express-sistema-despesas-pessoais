import sequelize from "./database.js";
import { DataTypes } from "sequelize";

const Expense = sequelize.define('expenses', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false

        },
        date: {
            type: DataTypes.DATE,
            allowNull: false

        },
        description: {
            type: DataTypes.STRING,
            allowNull: false

        }
})


// GET ALL
async function findAll() {
    return await Expense.findAll();
}

// GET BY ID
async function findById(id) {
    return await Expense.findByPk(id)
}


// CREATE
async function create(data) {
    return await Expense.create(data)
}

// UPDATE
async function update(id, data) {
    const expense = await findById(id);

    if (!expense) {
        return null;
    }

    expense.title = data.title;
    expense.amount = data.amount;
    expense.category = data.category;
    expense.date = data.date;
    expense.description = data.description;

    await expense.save();

    return expense;
}

// DELETE
async function remove(id) {
    const expense = await findById(id);
    if (!expense) {
        return null;
    }
    await expense.destroy();
    
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

export default {
    findAll,
    findById,
    create,
    update,
    remove,
    calculateTotal,
    groupByCategory,
    validateCreate,
    validateUpdate
}