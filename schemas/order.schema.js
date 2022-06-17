const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number();
const orderId = Joi.number();
const productId = Joi.number();
const amount = Joi.number();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
  customerId
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemschema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required(),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemschema
};
