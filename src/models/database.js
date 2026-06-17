import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()


const sequelize = new Sequelize('expenseSys', 'root', '', {dialect: 'mysql'});

export default sequelize; 



