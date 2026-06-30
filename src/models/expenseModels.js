import sequelize from "./database.js";
import { DataTypes, Sequelize } from "sequelize";

// Modelo de gastos
const Expense = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: 0.01
        }
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    status: {
        type: Sequelize.ENUM('PENDING', 'PAID'),
        allowNull: false,
        defaultValue: 'PENDING'
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
});

// Obtener todos los gastos con filtros opcionales
async function findAll(filters = {}) {
    const { Op } = await import('sequelize');
    const where = {};

    if (filters.userId) where.userId = filters.userId;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.status) where.status = filters.status;

    // Filtro por rango de fechas
    if (filters.startDate || filters.endDate) {
        where.date = {};
        if (filters.startDate) where.date[Op.gte] = filters.startDate;
        if (filters.endDate) where.date[Op.lte] = filters.endDate;
    }

    // Filtro por rango de monto
    if (filters.minAmount || filters.maxAmount) {
        where.amount = {};
        if (filters.minAmount) where.amount[Op.gte] = Number(filters.minAmount);
        if (filters.maxAmount) where.amount[Op.lte] = Number(filters.maxAmount);
    }

    return await Expense.findAll({ where });
}

// Buscar gasto por ID y usuario
async function findById(id, userId) {
    return await Expense.findOne({
        where: { id, userId }
    });
}

// Crear gasto
async function create(data) {
    return await Expense.create(data);
}

// Actualizar gasto
async function update(id, userId, data) {
    const expense = await findById(id, userId);

    if (!expense) return null;

    if (data.title !== undefined) expense.title = data.title;
    if (data.description !== undefined) expense.description = data.description;
    if (data.amount !== undefined) expense.amount = data.amount;
    if (data.date !== undefined) expense.date = data.date;
    if (data.status !== undefined) expense.status = data.status;
    if (data.categoryId !== undefined) expense.categoryId = data.categoryId;

    await expense.save();

    return expense;
}

// Eliminar gasto
async function remove(id, userId) {
    const expense = await findById(id, userId);

    if (!expense) return null;

    await expense.destroy();

    return true;
}

// Validación para crear gasto
function validateCreate(data) {
    const errors = [];

    if (!data.title?.trim()) errors.push('title is required');
    if (!data.description?.trim()) errors.push('description is required');
    if (!data.amount || data.amount <= 0) errors.push('amount must be greater than 0');
    if (!data.date || new Date(data.date) > new Date()) errors.push('date cannot be in the future');
    if (!data.categoryId) errors.push('categoryId is required');

    if (data.status && !['PENDING', 'PAID'].includes(data.status)) {
        errors.push('status must be PENDING or PAID');
    }

    return errors;
}

// Validación para actualizar gasto
function validateUpdate(data) {
    const errors = [];

    if (data.title !== undefined && !data.title.trim()) {
        errors.push('title cannot be empty');
    }

    if (data.description !== undefined && !data.description.trim()) {
        errors.push('description cannot be empty');
    }

    if (data.amount !== undefined && data.amount <= 0) {
        errors.push('amount must be greater than 0');
    }

    if (data.date !== undefined && new Date(data.date) > new Date()) {
        errors.push('date cannot be in the future');
    }

    if (data.status !== undefined && !['PENDING', 'PAID'].includes(data.status)) {
        errors.push('status must be PENDING or PAID');
    }

    return errors;
}

export default {
    findAll,
    findById,
    create,
    update,
    remove,
    validateCreate,
    validateUpdate
};

export { Expense };