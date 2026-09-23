const axios = require("axios");

const Review = require("../../models/review.model");
const User = require("../../models/user.model");
const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
afterEach(async () => {
  await Review.deleteMany({});
  await Product.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});
});

describe("Review API", () => {
  let user;
  let category;
  let product;

  beforeEach(async () => {
    user = await User.create({
      fullName: "Mohamed Ayman",
      email: "mohamed@example.com",
      password: "password123",
    });

    category = await Category.create({
      name: "Electronics",
    });

    product = await Product.create({
      name: "Keyboard",
      price: 1500,
      stock: 20,
      category: category._id,
    });
  });

  describe("POST /api/reviews", () => {
    it("should create a review", async () => {
      const response = await axios.post(`${baseURL}/api/reviews`, {
        userId: user._id,
        productId: product._id,
        rating: 5,
        comment: "Excellent product",
      });

      expect(response.status).toBe(201);
      expect(response.data.data.review).toBeDefined();
      expect(response.data.data.review.rating).toBe(5);
      expect(response.data.data.review.comment).toBe("Excellent product");
      expect(response.data.data.review.userId).toBe(user._id.toString());
      expect(response.data.data.review.productId).toBe(product._id.toString());
    });
  });

  describe("GET /api/reviews", () => {
    it("should get all reviews", async () => {
      await Review.create({
        userId: user._id,
        productId: product._id,
        rating: 5,
        comment: "Excellent product",
      });

      const response = await axios.get(`${baseURL}/api/reviews`);

      expect(response.status).toBe(200);
      expect(response.data.data.reviews).toBeDefined();
      expect(response.data.data.reviews).toHaveLength(1);
      expect(response.data.data.reviews[0].rating).toBe(5);
    });
  });

  describe("GET /api/reviews/:id", () => {
    it("should get a review by id", async () => {
      const review = await Review.create({
        userId: user._id,
        productId: product._id,
        rating: 4,
        comment: "Good product",
      });

      const response = await axios.get(`${baseURL}/api/reviews/${review._id}`);

      expect(response.status).toBe(200);
      expect(response.data.data.review).toBeDefined();
      expect(response.data.data.review._id).toBe(review._id.toString());
      expect(response.data.data.review.rating).toBe(4);
      expect(response.data.data.review.comment).toBe("Good product");
    });
  });

  describe("PUT /api/reviews/:id", () => {
    it("should update a review", async () => {
      const review = await Review.create({
        userId: user._id,
        productId: product._id,
        rating: 3,
        comment: "Good product",
      });

      const response = await axios.put(`${baseURL}/api/reviews/${review._id}`, {
        rating: 5,
        comment: "Excellent product",
      });

      expect(response.status).toBe(200);
      expect(response.data.data.review).toBeDefined();
      expect(response.data.data.review.rating).toBe(5);
      expect(response.data.data.review.comment).toBe("Excellent product");
    });
  });

  describe("DELETE /api/reviews/:id", () => {
    it("should delete a review", async () => {
      const review = await Review.create({
        userId: user._id,
        productId: product._id,
        rating: 4,
        comment: "Good product",
      });

      const response = await axios.delete(
        `${baseURL}/api/reviews/${review._id}`,
      );

      expect(response.status).toBe(200);

      const deletedReview = await Review.findById(review._id);

      expect(deletedReview).toBeNull();
    });
  });
});
