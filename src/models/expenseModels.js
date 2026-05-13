import sequelize from "./database";
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

        },
        createdAt: {
            type: DataTypes.DATE,
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
async function create(id, title, amount, category, date, description, createdAt) {
    return await Expense.create({id, title, amount, category, date, description, createdAt})
}

// UPDATE
async function update(id, title, amount, category, date, description, createdAt) {
    const expense = await findById(id);

    if (!expense) {
        return null;
    }

    expense.id = id;
    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    expense.description = description;
    expense.createdAt = createdAt;

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
    return null; 
}

/*// VALIDATION CREATE
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


// TOTAL

async function calculateTotal(list) {
    return await list.reduce((sum, e) => sum + e.amount, 0);
}

// GROUP BY CATEGORY
function groupByCategory(list) {
    return list.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {});
}*/

export default {
    findAll,
    findById,
    create,
    update,
    remove,

    /*calculateTotal,
    groupByCategory,
    validateCreate,
    validateUpdate*/
};