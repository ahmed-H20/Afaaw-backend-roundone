const axios = require("axios");

const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");
afterEach(async () => {
  await Cart.deleteMany({});
  await User.deleteMany({});
});

describe("Cart API", () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      fullName: "Mohamed Ayman",
      email: "mohamed@example.com",
      password: "password123",
    });
  });

  describe("POST /api/carts", () => {
    it("should create a cart", async () => {
      const response = await axios.post(`${baseURL}/api/carts`, {
        userId: user._id,
      });

      expect(response.status).toBe(201);
      expect(response.data.cart).toBeDefined();
      expect(response.data.cart.userId).toBe(user._id.toString());
    });
  });

  describe("GET /api/carts", () => {
    it("should get all carts", async () => {
      await Cart.create({
        userId: user._id,
      });

      const response = await axios.get(`${baseURL}/api/carts`);

      expect(response.status).toBe(200);
      expect(response.data.carts).toBeDefined();
      expect(response.data.carts).toHaveLength(1);
      expect(response.data.carts[0].userId._id).toBe(user._id.toString());
    });
  });

  describe("GET /api/carts/:id", () => {
    it("should get a cart by id", async () => {
      const cart = await Cart.create({
        userId: user._id,
      });

      const response = await axios.get(`${baseURL}/api/carts/${cart._id}`);

      expect(response.status).toBe(200);
      expect(response.data.cart).toBeDefined();
      expect(response.data.cart._id).toBe(cart._id.toString());
      expect(response.data.cart.userId._id).toBe(user._id.toString());
    });
  });

  describe("PUT /api/carts/:id", () => {
    it("should update a cart", async () => {
      const cart = await Cart.create({
        userId: user._id,
      });

      const response = await axios.put(`${baseURL}/api/carts/${cart._id}`, {
        userId: user._id,
      });

      expect(response.status).toBe(200);
      expect(response.data.cart).toBeDefined();
      expect(response.data.cart._id).toBe(cart._id.toString());
    });
  });

  describe("DELETE /api/carts/:id", () => {
    it("should delete a cart", async () => {
      const cart = await Cart.create({
        userId: user._id,
      });

      const response = await axios.delete(`${baseURL}/api/carts/${cart._id}`);

      expect(response.status).toBe(200);

      const deletedCart = await Cart.findById(cart._id);

      expect(deletedCart).toBeNull();
    });
  });
});
