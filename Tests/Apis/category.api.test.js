const axios = require("axios");

const Category = require("../../models/category.model");
const User = require("../../models/user.model");
const roles = require("../../constants/roles");
const { generateToken } = require("../../utils/jwt");
afterEach(async () => {
  await Category.deleteMany({});
  await User.deleteMany({});
});

describe("Category API", () => {
  let adminOptions;

  beforeEach(async () => {
    const admin = await User.create({
      fullName: "Admin User",
      email: "admin@example.com",
      password: "password123",
      phone: "+201001234567",
      address: "Cairo, Egypt",
      role: roles.ADMIN,
    });
    adminOptions = {
      headers: {
        Authorization: `Bearer ${generateToken(admin._id.toString())}`,
      },
    };
  });

  describe("POST /api/categories", () => {
    it("should create a category", async () => {
      const response = await axios.post(
        `${baseURL}/api/categories`,
        { name: "Electronics" },
        adminOptions,
      );

      expect(response.status).toBe(201);
      expect(response.data.data.category).toBeDefined();
      expect(response.data.data.category.name).toBe("Electronics");
    });
  });

  describe("GET /api/categories", () => {
    it("should get all categories", async () => {
      await Category.create({
        name: "Electronics",
      });

      await Category.create({
        name: "Clothing",
      });

      const response = await axios.get(`${baseURL}/api/categories`);

      expect(response.status).toBe(200);
      expect(response.data.data.categories).toBeDefined();
      expect(response.data.data.categories).toHaveLength(2);
      expect(response.data.data.categories[0].name).toBe("Electronics");
      expect(response.data.data.categories[1].name).toBe("Clothing");
    });
  });

  describe("GET /api/categories/:id", () => {
    it("should get a category by id", async () => {
      const category = await Category.create({
        name: "Electronics",
      });

      const response = await axios.get(
        `${baseURL}/api/categories/${category._id}`,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.category).toBeDefined();
      expect(response.data.data.category._id).toBe(category._id.toString());
      expect(response.data.data.category.name).toBe("Electronics");
    });
  });

  describe("PUT /api/categories/:id", () => {
    it("should update a category", async () => {
      const category = await Category.create({
        name: "Electronics",
      });

      const response = await axios.put(
        `${baseURL}/api/categories/${category._id}`,
        {
          name: "Updated Electronics",
        },
        adminOptions,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.category).toBeDefined();
      expect(response.data.data.category.name).toBe("Updated Electronics");
    });
  });

  describe("DELETE /api/categories/:id", () => {
    it("should delete a category", async () => {
      const category = await Category.create({
        name: "Electronics",
      });

      const response = await axios.delete(
        `${baseURL}/api/categories/${category._id}`,
        adminOptions,
      );

      expect(response.status).toBe(200);

      const deletedCategory = await Category.findById(category._id);

      expect(deletedCategory).toBeNull();
    });
  });
});
