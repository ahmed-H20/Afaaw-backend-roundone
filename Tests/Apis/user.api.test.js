const axios = require("axios");

const User = require("../../models/user.model");
const roles = require("../../constants/roles");
const { generateToken } = require("../../utils/jwt");

const createAdmin = async (userData = {}) => {
  const user = await User.create({
    fullName: "Mohamed Ayman",
    email: "admin@example.com",
    password: "password123",
    phone: "+201001234567",
    address: "Cairo, Egypt",
    role: roles.ADMIN,
    ...userData,
  });

  return {
    user,
    options: {
      headers: {
        Authorization: `Bearer ${generateToken(user._id.toString())}`,
      },
    },
  };
};

afterEach(async () => {
  await User.deleteMany({});
});

describe("User API", () => {
  describe("POST /api/users", () => {
    it("should create a user", async () => {
      const { options } = await createAdmin();
      const response = await axios.post(
        `${baseURL}/api/users`,
        {
          fullName: "Mohamed Ayman",
          email: "mohamed@example.com",
          password: "password123",
          phone: "+201001234567",
          address: "Cairo, Egypt",
        },
        options,
      );

      expect(response.status).toBe(201);
      expect(response.data.data.user).toBeDefined();
      expect(response.data.data.user.fullName).toBe("Mohamed Ayman");
      expect(response.data.data.user.email).toBe("mohamed@example.com");

      expect(response.data.data.user.password).toBeUndefined();
    });
  });

  describe("GET /api/users", () => {
    it("should get all users", async () => {
      const { options } = await createAdmin({ email: "mohamed@example.com" });

      await User.create({
        fullName: "Ahmed Ali",
        email: "ahmed@example.com",
        password: "password456",
        phone: "+201001234568",
        address: "Giza, Egypt",
      });

      const response = await axios.get(`${baseURL}/api/users`, options);

      expect(response.status).toBe(200);
      expect(response.data.data.users).toBeDefined();
      expect(response.data.data.users).toHaveLength(2);

      expect(response.data.data.users[0].password).toBeUndefined();
      expect(response.data.data.users[1].password).toBeUndefined();
    });
  });

  describe("GET /api/users/:id", () => {
    it("should get a user by id", async () => {
      const { user, options } = await createAdmin({
        email: "mohamed@example.com",
      });

      const response = await axios.get(
        `${baseURL}/api/users/${user._id}`,
        options,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.user).toBeDefined();
      expect(response.data.data.user._id).toBe(user._id.toString());
      expect(response.data.data.user.fullName).toBe("Mohamed Ayman");
      expect(response.data.data.user.email).toBe("mohamed@example.com");

      expect(response.data.data.user.password).toBeUndefined();
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update a user", async () => {
      const { user, options } = await createAdmin({
        email: "mohamed@example.com",
      });

      const response = await axios.put(
        `${baseURL}/api/users/${user._id}`,
        { fullName: "Mohamed Ayman Updated" },
        options,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.user).toBeDefined();
      expect(response.data.data.user.fullName).toBe("Mohamed Ayman Updated");
      expect(response.data.data.user.email).toBe("mohamed@example.com");

      expect(response.data.data.user.password).toBeUndefined();
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete a user", async () => {
      const { user, options } = await createAdmin({
        email: "mohamed@example.com",
      });

      const response = await axios.delete(
        `${baseURL}/api/users/${user._id}`,
        options,
      );

      expect(response.status).toBe(200);

      const deletedUser = await User.findById(user._id);

      expect(deletedUser).toBeNull();
    });
  });

  describe("GET /api/users/me", () => {
    it("should retrieve the authenticated user's profile", async () => {
      const authResponse = await axios.post(`${baseURL}/api/auth/register`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
        phone: "+201001234567",
        address: "Cairo, Egypt",
      });

      const response = await axios.get(`${baseURL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${authResponse.data.data.accessToken}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.data.user.email).toBe("mohamed@example.com");
      expect(response.data.data.user.password).toBeUndefined();
    });

    it("should reject unauthenticated requests", async () => {
      await expect(axios.get(`${baseURL}/api/users/me`)).rejects.toMatchObject({
        response: { status: 401 },
      });
    });
  });

  describe("PUT /api/users/me", () => {
    it("should update the authenticated user's profile without changing their role", async () => {
      const authResponse = await axios.post(`${baseURL}/api/auth/register`, {
        fullName: "Mohamed Ayman",
        email: "mohamed@example.com",
        password: "password123",
        phone: "+201001234567",
        address: "Cairo, Egypt",
      });

      const response = await axios.put(
        `${baseURL}/api/users/me`,
        { fullName: "Mohamed Ayman Updated", role: "admin" },
        {
          headers: {
            Authorization: `Bearer ${authResponse.data.data.accessToken}`,
          },
        },
      );

      expect(response.status).toBe(200);
      expect(response.data.data.user.fullName).toBe("Mohamed Ayman Updated");
      expect(response.data.data.user.role).not.toBe("admin");
      expect(response.data.data.user.password).toBeUndefined();
    });
  });
});
