import sequelize from "./database";
import { DataTypes } from "sequelize";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'users'
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    },

    updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

class UserModel {

    constructor() {}

        async createUser(email, password, name, role) {

        }
    
}