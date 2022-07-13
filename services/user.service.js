const boom = require('@hapi/boom');
const models = require('../models');

class UserService {
  constructor() {}

  async create(data) {
    let user = await models.User.create(data);
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user.dataValues;
  }

  async find() {
    return models.User.findAll({include: ['customer']});
  }

  async findOne(id) {
    let user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async findByEmail(email) {
    let user = await models.User.findOne({where: {email}});
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    let user = await this.findOne(id);
    return user.update(changes);
  }

  async delete(id) {
    let user = await this.findOne(id);
    return await user.destroy()
  }
}

module.exports = UserService;
