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

// The order owner comes from the token, never the URL.
const orderIdParams = idParams("orderId");

module.exports = {
  ORDER_STATUSES,
  updateStatusSchema,
  orderIdParams,
};
