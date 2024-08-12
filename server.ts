import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";

// Custom imports
import connectDB from "./config/db";

// Routes imports here
import authRoutes from "./routes/auth_routes";

// Enable colors
colors.enable();

// DOTENV
dotenv.config();

// REST OBJECT
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Body parser
app.use(morgan("dev"));

// ROUTES
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/v1/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 8000;

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();
    console.log(colors.cyan.underline("MongoDB connected successfully"));

    app.listen(PORT, () => {
      console.log(
        colors.bgWhite.red.bold(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
      );
    });
  } catch (error) {
    console.error(colors.red.bold("Failed to connect to MongoDB:"), error);
    process.exit(1);
  }
};

startServer();
