const { Model, DataTypes, NOW } = require('sequelize');

class Order extends Model {
  static assosiate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: NOW,
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references: { model: 'customers', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if(this.items.length > 0){
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0;
    }
  }
};

module.exports = { Order, orderSchema: schema };
