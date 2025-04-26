import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Customer from './Customer.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  observator: {
    type: DataTypes.STRING(40),
  },
  observator_phone_number: {
    type: DataTypes.STRING(20),
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lift_required: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: true
  },

  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: "orders",
  timestamps: false
});


export default Order;