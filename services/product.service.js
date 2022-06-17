const faker = require('faker');
const boom = require('@hapi/boom');
const models = require('../models');
const { Op } = require('sequelize');

class ProductsService {
	constructor() {
		this.products = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for (let index = 0; index < limit; index++) {
			this.products.push({
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.imageUrl(),
				isBlock: faker.datatype.boolean(),
			});
		}
	}

	async create(data) {
		return models.Product.create(data);
	}

	find(query) {
		let { offset, limit, price, max_price, min_price } = query;
		let options = { include: ['category'], where: {} };

		if (offset && limit) {
			options.offset = offset;
			options.limit = limit;
		}

		if (price) {
			options.where.price = price;
		}

    if (min_price && max_price) {
      options.where.price = {
        [Op.between]: [min_price, max_price]
      };
    }

		return models.Product.findAll(options);
	}

	async findOne(id) {
		let product = await models.Product.findByPk(id, { incluse: ['category'] });
		if (!product) {
			throw boom.notFound('Product not found');
		}
		return product;
	}

	async update(id, changes) {
		let product = await this.findOne(id);
		return product.update(changes);
	}

	async delete(id) {
		let product = await this.findOne(id);
		return product.destroy();
	}
}

module.exports = ProductsService;
