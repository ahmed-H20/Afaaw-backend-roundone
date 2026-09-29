const { z } = require("zod");

const { objectId } = require("./common.validation");
const ORDER_STATUS = require("../constants/orderStatus");

const status = z.enum(ORDER_STATUS, {
  message: "Invalid order status",
});

const createOrderSchema = z.object({
  body: z.object({
    userId: objectId,
    status: status.optional(),
  }),
});

const updateOrderSchema = z.object({
  params: z.object({ id: objectId }),
  body: z
    .object({ status })
    .partial()
    .refine(
      (body) => Object.keys(body).length > 0,
      "At least one field is required",
    ),
});

const orderIdSchema = z.object({
  params: z.object({ id: objectId }),
});

const orderUserIdSchema = z.object({
  params: z.object({ userId: objectId }),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  orderIdSchema,
  orderUserIdSchema,
};
