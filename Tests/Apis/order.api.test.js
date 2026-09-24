const axios = require("axios");

const Order = require("../../models/order.model");
const User = require("../../models/user.model");
afterEach(async () => {
  await Order.deleteMany({});
  await User.deleteMany({});
});

describe("Order API", () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      fullName: "Mohamed Ayman",
      email: "mohamed@example.com",
      password: "password123",
      phone: "+201001234567",
      address: "Cairo, Egypt",
    });
  });

  describe("POST /api/orders", () => {
    it("should create an order", async () => {
      const response = await axios.post(`${baseURL}/api/orders`, {
        userId: user._id,
      });

      expect(response.status).toBe(201);
      expect(response.data.data.order).toBeDefined();
      expect(response.data.data.order.userId).toBe(user._id.toString());
      expect(response.data.data.order.status).toBe("pending");
    });
  });

  describe("GET /api/orders", () => {
    it("should get all orders", async () => {
      await Order.create({
        userId: user._id,
      });

      const response = await axios.get(`${baseURL}/api/orders`);

      expect(response.status).toBe(200);
      expect(response.data.data.orders).toBeDefined();
      expect(response.data.data.orders).toHaveLength(1);
      expect(response.data.data.orders[0].userId._id).toBe(user._id.toString());
    });
  });

  describe("GET /api/orders/:id", () => {
    it("should get an order by id", async () => {
      const order = await Order.create({
        userId: user._id,
      });

      const response = await axios.get(`${baseURL}/api/orders/${order._id}`);

      expect(response.status).toBe(200);
      expect(response.data.data.order).toBeDefined();
      expect(response.data.data.order._id).toBe(order._id.toString());
      expect(response.data.data.order.status).toBe("pending");
    });
  });

  describe("PUT /api/orders/:id", () => {
    it("should update an order", async () => {
      const order = await Order.create({
        userId: user._id,
      });

      const response = await axios.put(`${baseURL}/api/orders/${order._id}`, {
        status: "confirmed",
      });

      expect(response.status).toBe(200);
      expect(response.data.data.order).toBeDefined();
      expect(response.data.data.order.status).toBe("confirmed");
    });
  });

  describe("DELETE /api/orders/:id", () => {
    it("should delete an order", async () => {
      const order = await Order.create({
        userId: user._id,
      });

      const response = await axios.delete(`${baseURL}/api/orders/${order._id}`);

      expect(response.status).toBe(200);

      const deletedOrder = await Order.findById(order._id);

      expect(deletedOrder).toBeNull();
    });
  });
});
