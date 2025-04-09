import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
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
  numbers: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  tableName: "properties",
  timestamps: false
});



export default Property;