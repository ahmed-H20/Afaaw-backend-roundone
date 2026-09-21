const mongoose = require("mongoose");
const axios = require("axios");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const app = require("../../app");

let mongoServer;
let server;
let baseURL;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);

  server = app.listen(0);

  const { port } = server.address();
  baseURL = `http://localhost:${port}`;
});

afterEach(async () => {
  await Product.deleteMany({});
  await Category.deleteMany({});
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }

  if (server) {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  }
});

describe("Product API", () => {
  let category;

  beforeEach(async () => {
    category = await Category.create({
      name: "Electronics",
    });
  });

  describe("POST /api/products", () => {
    it("should create a product", async () => {
      const response = await axios.post(`${baseURL}/api/products`, {
        name: "Keyboard",
        price: 1500,
        stock: 20,
        category: category._id,
      });

      expect(response.status).toBe(201);
      expect(response.data.product).toBeDefined();
      expect(response.data.product.name).toBe("Keyboard");
      expect(response.data.product.price).toBe(1500);
      expect(response.data.product.stock).toBe(20);
    });
  });

  describe("GET /api/products", () => {
    it("should get all products", async () => {
      await Product.create({
        name: "Keyboard",
        price: 1500,
        stock: 20,
        category: category._id,
      });

      await Product.create({
        name: "Mouse",
        price: 800,
        stock: 30,
        category: category._id,
      });

      const response = await axios.get(`${baseURL}/api/products`);

      expect(response.status).toBe(200);
      expect(response.data.products).toBeDefined();
      expect(response.data.products).toHaveLength(2);
      expect(response.data.products[0].name).toBe("Keyboard");
      expect(response.data.products[1].name).toBe("Mouse");
    });
  });

  describe("GET /api/products/:id", () => {
    it("should get a product by id", async () => {
      const product = await Product.create({
        name: "Keyboard",
        price: 1500,
        stock: 20,
        category: category._id,
      });

      const response = await axios.get(
        `${baseURL}/api/products/${product._id}`
      );

      expect(response.status).toBe(200);
      expect(response.data.product).toBeDefined();
      expect(response.data.product._id).toBe(product._id.toString());
      expect(response.data.product.name).toBe("Keyboard");
      expect(response.data.product.price).toBe(1500);
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update a product", async () => {
      const product = await Product.create({
        name: "Keyboard",
        price: 1500,
        stock: 20,
        category: category._id,
      });

      const response = await axios.put(
        `${baseURL}/api/products/${product._id}`,
        {
          name: "Mechanical Keyboard",
          price: 2500,
          stock: 15,
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.product).toBeDefined();
      expect(response.data.product.name).toBe("Mechanical Keyboard");
      expect(response.data.product.price).toBe(2500);
      expect(response.data.product.stock).toBe(15);
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      const product = await Product.create({
        name: "Keyboard",
        price: 1500,
        stock: 20,
        category: category._id,
      });

      const response = await axios.delete(
        `${baseURL}/api/products/${product._id}`
      );

      expect(response.status).toBe(200);

      const deletedProduct = await Product.findById(product._id);

      expect(deletedProduct).toBeNull();
    });
  });
});