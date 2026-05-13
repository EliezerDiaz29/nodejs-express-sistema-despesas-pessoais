import { Sequelize } from "sequelize";

const sequelize = new Sequelize('expenseSys', 'root', '', {dialect: 'mysql'});

export default sequelize; 



