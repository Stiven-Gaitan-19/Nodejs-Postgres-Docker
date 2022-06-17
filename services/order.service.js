const boom = require('@hapi/boom');
const models = require('../models')

class OrderService {

  constructor() {
  }

  async create(data) {
    return models.Order.create(data);
  }

  async find() {
    return models.Order.findAll();
  }

  async findOne(id) {
    let roder = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if (!roder) {
      throw boom.notFound('Order not found');
    }
    return roder;
  }

  async addItem(data){
    let result = await models.OrderProduct.findAll();
    console.log(result);
    return models.OrderProduct.create(data);
  }

  async update(id, changes) {
    let order = await this.findOne(id);
    return order.update(changes);
  }

  async delete(id) {
    let order = await this.findOne(id);
    return order.destroy();
  }

}

module.exports = OrderService;
