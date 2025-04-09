import pg from "pg";
import env from "dotenv"
import {Sequelize} from "sequelize"
env.config();

export const db = new pg.Client({
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
})

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USERNAME,
    process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false,
  }
)
console.log('DB credentials:', {
  name: process.env.PG_DATABASE,
  user: process.env.PG_USERNAME,
  pass: process.env.PG_PASSWORD,
});

export default sequelize;
