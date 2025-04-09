import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Complaint_feedback = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  types: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  user_id: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
    tableName: "complaint_feedback",
    timestamps: false,
});


export default Complaint_feedback;