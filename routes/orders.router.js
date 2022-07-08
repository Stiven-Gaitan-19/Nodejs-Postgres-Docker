const express = require('express');
const { checkScopes } = require('../middlewares/auth');
const OrderService = require('./../services/order.service');
const CustomerService = require('./../services/customer.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateOrderSchema, createOrderSchema, getOrderSchema, addItemschema } = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();
const customerService = new CustomerService();

router.get('/', checkScopes('admin', 'customer'), async (req, res, next) => {
	try {
		const orders = await service.find();
		res.json(orders);
	} catch (error) {
		next(error);
	}
});

router.get('/my-orders', checkScopes('customer'), async (req, res, next) => {
	try {
		let { user } = req;
		const orders = await service.findByUser(user.sub);
		res.json(orders);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/:id',
	checkScopes('admin', 'customer'),
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await service.findOne(id);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/', checkScopes('admin'), validatorHandler(createOrderSchema, 'body'), async (req, res, next) => {
	try {
		const body = req.body;
		let orderCreated = await service.create(body);

		res.status(201).json(orderCreated);
	} catch (error) {
		next(error);
	}
});

router.post('/customer-create', checkScopes('customer'), async (req, res, next) => {
	try {
		let { user } = req;
		let customer = await customerService.findByUser(user.sub);
		let orderCreated = await service.create({customerId: customer.id});

		res.status(201).json(orderCreated);
	} catch (error) {
		next(error);
	}
});

router.post('/add-item', checkScopes('customer'), validatorHandler(addItemschema, 'body'), async (req, res, next) => {
	try {
		const body = req.body;
		const newItem = await service.addItem(body);
		res.status(201).json(newItem);
	} catch (error) {
		next(error);
	}
});

router.patch(
	'/:id',
	checkScopes('admin'),
	validatorHandler(getOrderSchema, 'params'),
	validatorHandler(updateOrderSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const order = await service.update(id, body);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', checkScopes('admin'), validatorHandler(getOrderSchema, 'params'), async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id);
		res.status(201).json({ id });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
