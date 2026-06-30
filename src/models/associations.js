import { Category } from "./CategoryModel.js";
import { Expense } from "./expenseModels.js";
import { User } from "./userModel.js";

User.hasMany(Expense, {
    foreignKey: 'userId',
    as: 'expenses'
});

Category.hasMany(Expense, {
    foreignKey: 'categoryId',
    as: 'expenses'
});

Expense.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Expense.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

export { User, Category, Expense };