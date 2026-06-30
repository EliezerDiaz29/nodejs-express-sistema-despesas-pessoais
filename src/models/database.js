import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MYSQL_DATABASE) {
    throw new Error("Missing MYSQL_DATABASE in .env");
}

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        dialect: "mysql",
        logging: (msg) => console.log("[SQL]", msg),
    }
);

export default sequelize;