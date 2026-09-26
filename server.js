import "dotenv/config";
import { pathToFileURL } from "node:url";
import app from "./app.js";
import connectDB from "./config/database.js";

export const startServer = async () => {
  await connectDB();

  const port = process.env.PORT || 5000;
  return app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
  });
};

// This check ensures that the server starts only when this file is run directly, not when it's imported as a module.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}