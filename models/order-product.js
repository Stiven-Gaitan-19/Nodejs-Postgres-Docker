const { Model, DataTypes, NOW } = require('sequelize');

class OrderProduct extends Model {
  static assosiate() {
  }
}

let schema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
    references: { model: 'orders', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    references: { model: 'products', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

module.exports = { OrderProduct, orderProductSchema: schema };
