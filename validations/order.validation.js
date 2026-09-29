const { z } = require("zod");

const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().min(1),
    status: z
      .enum(["pending", "confirmed", "shipped", "delivered", "cancelled"])
      .optional(),
  }),
});

const orderIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

const userIdSchema = z.object({
  params: z.object({
    userId: z.string().min(1),
  }),
});

const updateOrderSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    userId: z.string().min(1).optional(),
    status: z
      .enum(["pending", "confirmed", "shipped", "delivered", "cancelled"])
      .optional(),
  }),
});

module.exports = {
  createOrderSchema,
  orderIdSchema,
  userIdSchema,
  updateOrderSchema,
};