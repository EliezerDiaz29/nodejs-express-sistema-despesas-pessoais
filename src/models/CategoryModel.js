import sequelize from "./database";
import { DataTypes } from "sequelize";

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

class CategoryModel {
    constructor() {}

    async findAllCategory() {
        return await Category.findAll();
    }

    async findCategoryById(id) {
        return await Category.findByPk(id);
    }

    async createCategory(data) {
        return await Category.create(data);
    }

    async updateCategory(id, data) {
        const category = await this.findCategoryById(id);

        if (!category) {
            return null;
        }

        category.name = data.name;
        category.description = data.description

        await category.save();

        return category;
    }

    async removeCategory(id) {
        const category = await this.findCategoryById(id);

        if (!category) {
            return null;
        }
        await category.destroy();

        return true;
    }
}

const categoryModel = new CategoryModel();

export default CategoryModel; 

