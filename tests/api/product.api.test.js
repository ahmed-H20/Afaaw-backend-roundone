import mongoose from "mongoose";
import axios from "axios";
import "dotenv/config";
import app from "../../app.js";
import Product from "../../models/product.model.js";

let server;
let baseURL;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL_TEST);

  server = app.listen(0);

  const { port } = server.address();
  baseURL = `http://localhost:${port}`;
});

afterEach(async () => {
  await Product.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  await new Promise((resolve) => {
    server.close(resolve);
  });
});

describe("POST /api/products", () => {
  it("should create a product", async () => {
    const productData = {
      name: "Keyboard",
      price: 1500,
      stock: 20,
    };

    try {
      const response = await axios.post(`${baseURL}/api/products`, productData);
      expect(response.status).toBe(201);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("HEADERS:", error.response?.headers);

      throw error;
    }
  });
});
