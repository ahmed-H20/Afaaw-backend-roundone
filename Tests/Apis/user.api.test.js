const axios = require("axios");

const User = require("../../models/user.model");
afterEach(async () => {
  await User.deleteMany({});
});

describe("User API", () => {
  describe("POST /api/users", () => {
    it("should create a user", async () => {
      const response = await axios.post(`${baseURL}/api/users`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.data.user).toBeDefined();
      expect(response.data.user.fullName).toBe("Mohamed Ayman");
      expect(response.data.user.email).toBe("mohamed@example.com");

      expect(response.data.user.password).toBeUndefined();
    });
  });

  describe("GET /api/users", () => {
    it("should get all users", async () => {
      await User.create({
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      await User.create({
        fullName: "Ahmed Ali",
        email: "ahmed@example.com",
        password: "password456",
      });

      const response = await axios.get(`${baseURL}/api/users`);

      expect(response.status).toBe(200);
      expect(response.data.users).toBeDefined();
      expect(response.data.users).toHaveLength(2);

      expect(response.data.users[0].password).toBeUndefined();
      expect(response.data.users[1].password).toBeUndefined();
    });
  });

  describe("GET /api/users/:id", () => {
    it("should get a user by id", async () => {
      const user = await User.create({
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      const response = await axios.get(
        `${baseURL}/api/users/${user._id}`
      );

      expect(response.status).toBe(200);
      expect(response.data.user).toBeDefined();
      expect(response.data.user._id).toBe(user._id.toString());
      expect(response.data.user.fullName).toBe("Mohamed Ayman");
      expect(response.data.user.email).toBe("mohamed@example.com");

      expect(response.data.user.password).toBeUndefined();
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update a user", async () => {
      const user = await User.create({
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      const response = await axios.put(
        `${baseURL}/api/users/${user._id}`,
        {
          fullName: "Mohamed Ayman Updated",
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.user).toBeDefined();
      expect(response.data.user.fullName).toBe("Mohamed Ayman Updated");
      expect(response.data.user.email).toBe("mohamed@example.com");

      expect(response.data.user.password).toBeUndefined();
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete a user", async () => {
      const user = await User.create({
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
      });

      const response = await axios.delete(
        `${baseURL}/api/users/${user._id}`
      );

      expect(response.status).toBe(200);

      const deletedUser = await User.findById(user._id);

      expect(deletedUser).toBeNull();
    });
  });
});