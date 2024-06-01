'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Internal extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Internal.init({
    internal_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    column: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    xs1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    xs2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    xs3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Internal',
    tableName: 'internals',
    timestamps: false
  });
  return Internal;
};
