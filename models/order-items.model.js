import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema(
	{
		orderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
			validate: Number.isInteger,
		},
		unitPrice: {
			type: Number,
			required: true,
			min: 0,
		},
		color: { type: String, trim: true },
		size: { type: String, trim: true },
	},
	{ timestamps: true },
);

orderItemsSchema.index({ orderId: 1 });

export const OrderItem = mongoose.model("OrderItem", orderItemsSchema);