import mongoose from "mongoose";
import axios from "axios";
import "dotenv/config";
import app from "../../app.js";
import { Cart } from "../../models/cart.model.js";
import { CartItem } from "../../models/cart-items.model.js";
import { Categories } from "../../models/category.model.js";
import { OrderItem } from "../../models/order-items.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";

let server;
let baseURL;
let adminUser;
let adminToken;
let regularUser;
let regularUserToken;

beforeAll(async () => {
  const testDatabaseUrl = process.env.MONGODB_URL_TEST;
  if (!testDatabaseUrl) {
    throw new Error("MONGODB_URL_TEST must point to a dedicated test database");
  }

  const databaseName = new URL(testDatabaseUrl).pathname.replace(/^\/+/, "");
  if (!/(^|[_-])test($|[_-])/i.test(databaseName)) {
    throw new Error("Refusing to run tests: database name must clearly include 'test'");
  }

  await mongoose.connect(testDatabaseUrl);
  process.env.JWT_SECRET = "product-api-test-jwt-secret-with-at-least-32-bytes";
  adminUser = await new User({
    name: "API Test Admin",
    email: "admin-product-test@example.com",
    password: "a-strong-test-password-789",
    verified: true,
    role: "admin",
  }).save();
  adminToken = jwt.sign({ sub: String(adminUser._id), ver: 0 }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  regularUser = await new User({
    name: "API Test User",
    email: "user-product-test@example.com",
    password: "a-strong-test-password-123",
    verified: true,
  }).save();
  regularUserToken = jwt.sign({ sub: String(regularUser._id), ver: 0 }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  axios.defaults.headers.common.Authorization = `Bearer ${adminToken}`;

  server = app.listen(0);

  const { port } = server.address();
  baseURL = `http://localhost:${port}`;
});

afterEach(async () => {
  await Promise.all([
    Cart.deleteMany({}),
    CartItem.deleteMany({}),
    Categories.deleteMany({}),
    Order.deleteMany({}),
    OrderItem.deleteMany({}),
    Product.deleteMany({}),
  ]);
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  if (server) {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  }
  delete axios.defaults.headers.common.Authorization;
});

describe("POST /api/products", () => {
  it("should create a product", async () => {
    const productData = {
      name: "Keyboard",
      price: 1500,
      stock: 20,
    };

    const response = await axios.post(`${baseURL}/api/products`, productData);
    expect(response.status).toBe(201);
  });

  it("should reject a category that does not exist", async () => {
    await expect(
      axios.post(`${baseURL}/api/products`, {
        name: "Keyboard",
        price: 1500,
        stock: 20,
        category: "507f1f77bcf86cd799439011",
      }),
    ).rejects.toMatchObject({
      response: { status: 404 },
    });
  });
});

describe("authorization", () => {
  it("requires authentication for writes and restricts carts to their owner", async () => {
    const originalAuthorization = axios.defaults.headers.common.Authorization;
    try {
      delete axios.defaults.headers.common.Authorization;
      await expect(
        axios.post(`${baseURL}/api/products`, { name: "Keyboard", price: 1500, stock: 20 }),
      ).rejects.toMatchObject({ response: { status: 401 } });

      axios.defaults.headers.common.Authorization = `Bearer ${regularUserToken}`;
      await expect(
        axios.post(`${baseURL}/api/products`, { name: "Keyboard", price: 1500, stock: 20 }),
      ).rejects.toMatchObject({ response: { status: 403 } });
      await expect(axios.get(`${baseURL}/api/carts/${adminUser._id}`)).rejects.toMatchObject({
        response: { status: 403 },
      });
    } finally {
      axios.defaults.headers.common.Authorization = originalAuthorization;
    }
  });
});

describe("DELETE /api/categories/:id", () => {
  it("should reject deleting a category assigned to a product", async () => {
    const { data: category } = await axios.post(`${baseURL}/api/categories`, {
      name: "Accessories",
    });
    await axios.post(`${baseURL}/api/products`, {
      name: "Keyboard",
      price: 1500,
      stock: 20,
      category: category._id,
    });

    await expect(axios.delete(`${baseURL}/api/categories/${category._id}`)).rejects.toMatchObject({
      response: { status: 409 },
    });
  });
});

describe("DELETE /api/products/:id", () => {
  it("should reject deleting a product that is in a cart", async () => {
    const { data: product } = await axios.post(`${baseURL}/api/products`, {
      name: "Keyboard",
      price: 1500,
      stock: 20,
    });
    const userId = String(adminUser._id);

    await axios.post(`${baseURL}/api/carts/${userId}/items`, {
      productId: product._id,
      quantity: 1,
    });

    await expect(axios.delete(`${baseURL}/api/products/${product._id}`)).rejects.toMatchObject({
      response: { status: 409 },
    });
  });
});

describe("POST /api/reviews", () => {
  it("should reject a review for a product that does not exist", async () => {
    await expect(
      axios.post(`${baseURL}/api/reviews`, {
        productId: "507f1f77bcf86cd799439012",
        rating: 5,
      }),
    ).rejects.toMatchObject({
      response: { status: 404 },
    });
  });
});

describe("Order lifecycle", () => {
  it("creates order items with purchase-time prices, totals, and reserved stock", async () => {
    const { data: product } = await axios.post(`${baseURL}/api/products`, {
      name: "Keyboard",
      price: 1500,
      stock: 8,
    });

    const { data: order } = await axios.post(`${baseURL}/api/orders`, {
      items: [
        { productId: product._id, quantity: 2, color: "Black", size: "Full" },
        { productId: product._id, quantity: 1 },
      ],
    });

    expect(order.status).toBe("pending");
    expect(order.totalAmount).toBe(4500);
    expect(order.totalItems).toBe(3);
    expect(order.items).toHaveLength(2);
    expect(order.items[0].unitPrice).toBe(1500);
    expect((await Product.findById(product._id)).stock).toBe(5);

    const { data: fetchedOrder } = await axios.get(`${baseURL}/api/orders/${order._id}`);
    expect(fetchedOrder.items).toHaveLength(2);
    expect(fetchedOrder.totalAmount).toBe(4500);
  });

  it("rejects stock shortages without partially reserving stock", async () => {
    const { data: product } = await axios.post(`${baseURL}/api/products`, {
      name: "Mouse",
      price: 400,
      stock: 2,
    });

    await expect(
      axios.post(`${baseURL}/api/orders`, {
        items: [{ productId: product._id, quantity: 3 }],
      }),
    ).rejects.toMatchObject({ response: { status: 409 } });

    expect((await Product.findById(product._id)).stock).toBe(2);
    expect(await Order.countDocuments()).toBe(0);
  });

  it("restores earlier reservations when a later order line has insufficient stock", async () => {
    const { data: firstProduct } = await axios.post(`${baseURL}/api/products`, {
      name: "USB Hub",
      price: 250,
      stock: 3,
    });
    const { data: secondProduct } = await axios.post(`${baseURL}/api/products`, {
      name: "Monitor",
      price: 5000,
      stock: 1,
    });

    await expect(
      axios.post(`${baseURL}/api/orders`, {
        items: [
          { productId: firstProduct._id, quantity: 2 },
          { productId: secondProduct._id, quantity: 2 },
        ],
      }),
    ).rejects.toMatchObject({ response: { status: 409 } });

    expect((await Product.findById(firstProduct._id)).stock).toBe(3);
    expect((await Product.findById(secondProduct._id)).stock).toBe(1);
    expect(await Order.countDocuments()).toBe(0);
  });

  it("restores inventory once when cancelling and rejects invalid transitions", async () => {
    const { data: product } = await axios.post(`${baseURL}/api/products`, {
      name: "Headphones",
      price: 900,
      stock: 4,
    });
    const { data: order } = await axios.post(`${baseURL}/api/orders`, {
      items: [{ productId: product._id, quantity: 2 }],
    });

    const { data: cancelledOrder } = await axios.patch(`${baseURL}/api/orders/${order._id}`, {
      status: "cancelled",
    });
    expect(cancelledOrder.inventoryRestocked).toBe(true);
    expect((await Product.findById(product._id)).stock).toBe(4);

    await expect(
      axios.patch(`${baseURL}/api/orders/${order._id}`, { status: "confirmed" }),
    ).rejects.toMatchObject({ response: { status: 409 } });
    expect((await Product.findById(product._id)).stock).toBe(4);
  });

  it("restores pending-order inventory and removes line items on deletion", async () => {
    const { data: product } = await axios.post(`${baseURL}/api/products`, {
      name: "Webcam",
      price: 1200,
      stock: 3,
    });
    const { data: order } = await axios.post(`${baseURL}/api/orders`, {
      items: [{ productId: product._id, quantity: 1 }],
    });

    await axios.delete(`${baseURL}/api/orders/${order._id}`);

    expect((await Product.findById(product._id)).stock).toBe(3);
    expect(await OrderItem.countDocuments({ orderId: order._id })).toBe(0);
    expect(await Order.exists({ _id: order._id })).toBeNull();
  });

  it("does not allow a user to access another user's order", async () => {
    const { data: product } = await axios.post(`${baseURL}/api/products`, {
      name: "Microphone",
      price: 800,
      stock: 2,
    });
    const { data: order } = await axios.post(`${baseURL}/api/orders`, {
      items: [{ productId: product._id, quantity: 1 }],
    });

    axios.defaults.headers.common.Authorization = `Bearer ${regularUserToken}`;
    await expect(axios.get(`${baseURL}/api/orders/${order._id}`)).rejects.toMatchObject({
      response: { status: 403 },
    });
    axios.defaults.headers.common.Authorization = `Bearer ${adminToken}`;
  });
});
