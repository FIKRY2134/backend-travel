'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Define associations here
      Review.belongsTo(models.User, { foreignKey: 'user_id' });
      Review.belongsTo(models.Destinasi, { foreignKey: 'destinasi_id' });
    }
  }
  Review.init({
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    destinasi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'destinasi',
        key: 'destinasi_id'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    komentar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false // Set to false if you do not want Sequelize to handle updatedAt
  });
  return Review;
};
