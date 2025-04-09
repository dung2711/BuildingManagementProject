import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Order from './Order.js';

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rented_area: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  contract_expired_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  contact_person: {
    type: DataTypes.STRING(40),
  },
  contact_number: {
    type: DataTypes.STRING(20),
  },
  director_name: {
    type: DataTypes.STRING(40),
  },
  director_phone_number: {
    type: DataTypes.STRING(20),
  }

}, {
  tableName: "customers",
  timestamps: false
});

export default Customer;