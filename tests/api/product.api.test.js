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

let server;
let baseURL;

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
    const userId = "507f1f77bcf86cd799439011";

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
        userId: "507f1f77bcf86cd799439011",
        productId: "507f1f77bcf86cd799439012",
        rating: 5,
      }),
    ).rejects.toMatchObject({
      response: { status: 404 },
    });
  });
});

describe("Order lifecycle", () => {
  const userId = "507f1f77bcf86cd799439011";

  it("creates order items with purchase-time prices, totals, and reserved stock", async () => {
    const { data: product } = await axios.post(`${baseURL}/api/products`, {
      name: "Keyboard",
      price: 1500,
      stock: 8,
    });

    const { data: order } = await axios.post(`${baseURL}/api/orders`, {
      userId,
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
        userId,
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
        userId,
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
      userId,
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
      userId,
      items: [{ productId: product._id, quantity: 1 }],
    });

    await axios.delete(`${baseURL}/api/orders/${order._id}`);

    expect((await Product.findById(product._id)).stock).toBe(3);
    expect(await OrderItem.countDocuments({ orderId: order._id })).toBe(0);
    expect(await Order.exists({ _id: order._id })).toBeNull();
  });
});
