const boom = require('@hapi/boom');
const models = require('../models')

class CategoryService {

  constructor() {
  }

  async create(data) {
    return models.Category.create(data);
  }

  async find() {
    return models.Category.findAll();
  }

  async findOne(id) {
    let category = await models.Category.findByPk(id, { include: ['products'] });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    let category = await this.findOne(id);
    return category.update(changes);
  }

  async delete(id) {
    let category = await this.findOne(id);
    return category.destroy();
  }

}

module.exports = CategoryService;
