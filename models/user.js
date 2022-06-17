const { Model, DataTypes, NOW } = require('sequelize');

class User extends Model {
  static assosiate(entity) {
    this.hasOne(entity, {
      as: 'customer',
      foreignKey: 'userId',
    });
  }
}

let schema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: { allowNull: false, type: DataTypes.STRING, unique: true },
  password: { allowNull: false, type: DataTypes.STRING },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: NOW,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
};

module.exports = { User, userSchema: schema };
