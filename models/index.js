const { User, userSchema } = require('./user');
const { Customer, customerSchema } = require('./customer');
const { Product, productSchema } = require('./product');
const { Category, categorySchema } = require('./category');
const { Order, orderSchema } = require('./order');
const { OrderProduct, orderProductSchema } = require('./order-product');
const sequelize = require('../libs/sequealize');
const bcrypt = require('bcrypt');

(function setupModels() {
  User.init(userSchema, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeCreate: async (user)=> {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });
  Customer.init(customerSchema, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: false,
  });
  Category.init(categorySchema, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
  });
  Product.init(productSchema, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false,
  });
  Order.init(orderSchema, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
  });
  OrderProduct.init(orderProductSchema,{
    sequelize,
    modelName: 'OrderProduct',
    tableName: 'orders_products',
    timestamps: false,
  });

  Customer.assosiate(sequelize.models);
  User.assosiate(sequelize.models.Customer);
  Product.assosiate(sequelize.models.Category);
  Category.assosiate(sequelize.models.Product);
  Order.assosiate(sequelize.models)
})();

module.exports = sequelize.models;
