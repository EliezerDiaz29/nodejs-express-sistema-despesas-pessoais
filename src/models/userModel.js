import sequelize from "./database";
import { DataTypes } from "sequelize";

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },

    nameUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

class UserModel {
    constructor() {}

    async getUserById() {
        return await User.findByPk;
    }

    async getAllUser() {
        return await User.findAll;
    }

    async createUser(nameUser, email, password, createAt, updateAt) {
        return User.create({ nameUser, email, password, createAt, updateAt });
    }

    async updateUser(id, name, email, password, createAt, updateAt) {
        const user = await this.getUserById(id);

        if (!user) {
            return null;
        }

            user.nameUser = name,
            user.email = email,
            user.password = password,
            user.createAt = createAt,
            user.updateAt = updateAt;

        await user.save();

        return user;
    }

    async deleteUser(id) {

        const user = await this.getUserById(id);

        if(!user) {
            return null;
        }
        await user.destroy()
        return null;

    }
}

const userModel = new UserModel();

export default UserModel;