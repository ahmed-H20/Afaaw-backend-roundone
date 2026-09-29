const axios = require("axios");
const dotenv = require("dotenv");

const User = require("../../models/user.model");
afterEach(async () => {
  await User.deleteMany({});
});

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user and return an access token", async () => {
      const response = await axios.post(`${baseURL}/api/auth/register`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
        phone: "+201001234567",
        address: "Cairo, Egypt",
      });

      expect(response.status).toBe(201);

      expect(response.data.message).toBe("User registered successfully");

      expect(response.data.data.user).toBeDefined();
      expect(response.data.data.user.fullName).toBe("Mohamed Ayman");
      expect(response.data.data.user.email).toBe("mohamed@example.com");
      expect(response.data.data.user.password).toBeUndefined();

      expect(response.data.data.accessToken).toBeDefined();
      expect(typeof response.data.data.accessToken).toBe("string");

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
        phone: "+201001234567",
        address: "Cairo, Egypt",
      });

      try {
        await axios.post(`${baseURL}/api/auth/register`, {
          fullName: "Another User",
          email: "mohamed@example.com",
          password: "password456",
          phone: "+201001234568",
          address: "Giza, Egypt",
        });
      } catch (error) {
        expect(error.response.status).toBe(409);
        expect(error.response.data.message).toBe("Email is already registered");
      }
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials and return an access token", async () => {
      await axios.post(`${baseURL}/api/auth/register`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
        phone: "+201001234567",
        address: "Cairo, Egypt",
      });

      const response = await axios.post(`${baseURL}/api/auth/login`, {
        email: "mohamed@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);

      expect(response.data.message).toBe("Login successful");

      expect(response.data.data.user).toBeDefined();
      expect(response.data.data.user.email).toBe("mohamed@example.com");
      expect(response.data.data.user.password).toBeUndefined();

      expect(response.data.data.accessToken).toBeDefined();
      expect(typeof response.data.data.accessToken).toBe("string");
    });

    it("should reject invalid password", async () => {
      await axios.post(`${baseURL}/api/auth/register`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
        phone: "+201001234567",
        address: "Cairo, Egypt",
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
