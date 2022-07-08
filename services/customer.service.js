const boom = require('@hapi/boom');
const models = require('../models');

class UserService {
  constructor(){}

  async create(data) {
    let customer = await models.Customer.create(data, {include: ['user']});
    delete customer.dataValues.user.dataValues.password;
    return customer.dataValues;
  }

  async find() {
    return models.Customer.findAll({ include: ['user'] });
  }

  async findOne(id) {
    let customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async findByUser(userId){
    return models.Customer.findOne({where: {'$user.id$': userId}, include: ['user']});
  }

  async update(id, changes) {
    let customer = await this.findOne(id);
    return customer.update(changes);
  }

  async delete(id) {
    let customer = await this.findOne(id);
    return customer.destroy();
  }
}

module.exports = UserService;
