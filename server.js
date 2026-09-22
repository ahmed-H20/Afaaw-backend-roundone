const dotenv = require("dotenv");
const connectDB = require("./config/db");
const ApiError = require("./utils/ApiError");
const globalError = require("./middlewares/globalError.middleware");
const app = require("./app");

dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.use((req, res, next) => {
      next(new ApiError(`Can't find this route : ${req.originalUrl}`, 404));
    });

    app.use(globalError);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
