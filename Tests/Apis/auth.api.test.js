const axios = require("axios");
const dotenv = require("dotenv");

const User = require("../../models/user.model");
afterEach(async () => {
  await User.deleteMany({});
});

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user and return a token", async () => {
      const response = await axios.post(`${baseURL}/api/auth/register`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);

      expect(response.data.message).toBe("User registered successfully");

      expect(response.data.user).toBeDefined();
      expect(response.data.user.fullName).toBe("Mohamed Ayman");
      expect(response.data.user.email).toBe("mohamed@example.com");
      expect(response.data.user.password).toBeUndefined();

      expect(response.data.token).toBeDefined();
      expect(typeof response.data.token).toBe("string");

      const user = await User.findOne({
        email: "mohamed@example.com",
      });

      expect(user).toBeDefined();
      expect(user.password).not.toBe("password123");
    });

    it("should not register a user with an existing email", async () => {
      await User.create({
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      try {
        await axios.post(`${baseURL}/api/auth/register`, {
          fullName: "Another User",
          email: "mohamed@example.com",
          password: "password456",
        });
      } catch (error) {
        expect(error.response.status).toBe(409);
        expect(error.response.data.message).toBe("Email is already registered");
      }
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials and return a token", async () => {
      await axios.post(`${baseURL}/api/auth/register`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      const response = await axios.post(`${baseURL}/api/auth/login`, {
        email: "mohamed@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);

      expect(response.data.message).toBe("Login successful");

      expect(response.data.user).toBeDefined();
      expect(response.data.user.email).toBe("mohamed@example.com");
      expect(response.data.user.password).toBeUndefined();

      expect(response.data.token).toBeDefined();
      expect(typeof response.data.token).toBe("string");
    });

    it("should reject invalid password", async () => {
      await axios.post(`${baseURL}/api/auth/register`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      try {
        await axios.post(`${baseURL}/api/auth/login`, {
          email: "mohamed@example.com",
          password: "wrongpassword",
        });
      } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.message).toBe("Invalid email or password");
      }
    });

    it("should reject a non-existing user", async () => {
      try {
        await axios.post(`${baseURL}/api/auth/login`, {
          email: "unknown@example.com",
          password: "password123",
        });
      } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.message).toBe("Invalid email or password");
      }
    });
  });
});
