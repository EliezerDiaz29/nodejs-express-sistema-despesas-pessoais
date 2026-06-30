import bcrypt from 'bcrypt';
import sequelize from "./database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    nameUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
});

class UserModel {

    async getUserById(id) {
        return await User.findByPk(id);
    }

    async getUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async getAllUser() {
        return await User.findAll();
    }

    async createUser(nameUser, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await User.create({ nameUser, email, password: hashedPassword });
    }

    async updateUser(id, nameUser, email, password) {
        const user = await this.getUserById(id);

        if (!user) return null;

        if (nameUser) user.nameUser = nameUser;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();

        return user;
    }

    async deleteUser(id) {
        const user = await this.getUserById(id);

        if (!user) return null;

        await user.destroy();
        return true;
    }

    async checkPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

const userModel = new UserModel();

export default userModel;

export { User };