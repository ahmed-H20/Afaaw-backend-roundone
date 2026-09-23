const express = require("express");
const request = require("supertest");
const validate = require("../../middleware/validate");
const { createProductValidation } = require("../../utils/validators/productValidator");
const globalErrorHandler = require("../../middleware/globalErrorHandler");

describe("Product validation and error handling", () => {
  it("should allow valid product payloads through validation", async () => {
    const app = express();
    app.use(express.json());

    app.post("/products", createProductValidation, validate, (req, res) => {
      res.status(201).json({ status: "success", message: "Product created" });
    });

    app.use(globalErrorHandler);

    const response = await request(app)
      .post("/products")
      .send({
        name: "Keyboard",
        price: 1500,
        stock: 20,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product created");
  });

  it("should reject invalid product payloads with detailed errors in development", async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    try {
      const app = express();
      app.use(express.json());

      app.post("/products", createProductValidation, validate, (req, res) => {
        res.status(201).json({ status: "success", message: "Product created" });
      });

      app.use(globalErrorHandler);

      const response = await request(app)
        .post("/products")
        .send({
          price: "not-a-number",
          stock: -5,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation failed");
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: "name" }),
          expect.objectContaining({ field: "price" }),
        ]),
      );
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });

  it("should hide validation details in production", async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    try {
      const app = express();
      app.use(express.json());

      app.post("/products", createProductValidation, validate, (req, res) => {
        res.status(201).json({ status: "success", message: "Product created" });
      });

      app.use(globalErrorHandler);

      const response = await request(app)
        .post("/products")
        .send({
          price: "not-a-number",
          stock: -5,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation failed");
      expect(response.body.errors).toBeUndefined();
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });
});
