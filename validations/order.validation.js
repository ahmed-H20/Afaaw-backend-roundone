const { z } = require("zod");
const { idParams } = require("./common");

// Must stay in sync with orderModel's enum and STATUS_TRANSITIONS.
const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const updateStatusSchema = z.strictObject({
  status: z.enum(ORDER_STATUSES),
});

const orderUserParams = idParams("userId");
const orderIdParams = idParams("orderId");
const orderUserAndIdParams = idParams("userId", "orderId");

module.exports = {
  ORDER_STATUSES,
  updateStatusSchema,
  orderUserParams,
  orderIdParams,
  orderUserAndIdParams,
};
