const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string();
const categoryId = Joi.number();
const offset = Joi.number().integer();
const limit = Joi.number().integer();
const min_price = Joi.number().integer();
const max_price = Joi.number().integer();

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	image: image.required(),
	description: description.required(),
	categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
	name: name,
	price: price,
	image: image,
	description,
});

const getProductSchema = Joi.object({
	id: id.required(),
});

const queryProductSchema = Joi.object({
	limit,
	offset,
  price,
  min_price,
  max_price: max_price.when('min_price', {
    is: Joi.number().integer(),
    then: Joi.required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
