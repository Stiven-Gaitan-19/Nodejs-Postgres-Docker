const { Model, DataTypes, NOW } = require('sequelize');

class Customer extends Model {
  static assosiate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Order, {as: 'orders', foreignKey: 'customerId'})
  }
}

let schema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: { allowNull: false, type: DataTypes.STRING },
  lastName: { allowNull: false, type: DataTypes.STRING, field: 'last_name' },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: NOW,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    field: 'user_id',
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

module.exports = { Customer, customerSchema: schema };
