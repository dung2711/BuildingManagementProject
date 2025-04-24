import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Customer from './Customer.js';

const Technical_issue = sequelize.define('Technical_issue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
  }
}, {
    tableName: "technical_issues",
    timestamps: false
});


export default Technical_issue;