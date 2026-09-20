const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema(
	{
		quantity: Number,
		color: String,
		size: String,
		price: Number,
		orderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Cart',
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	},
	{
		timestamps: true,
	},
);

const OrderItem = mongoose.model('OrderItem', orderItemsSchema);
module.exports = OrderItem;
