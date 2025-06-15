import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  authentication: {
    type: DataTypes.ENUM("customer", "admin", "manager"),
    allowNull: false,
    defaultValue: "customer",
  },
  name: {
    type: DataTypes.STRING(40),
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  identification: {
    type: DataTypes.STRING(20),
  },
  customer_id: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: "users",
  timestamps: false
});



export default User;