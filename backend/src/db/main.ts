import { Sequelize } from 'sequelize';
import * as path from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, './data/', 'default.sqlite'),
  host: 'localhost',
  logging: console.log,
});

export default sequelize;
