import express from "express";
import { connectDatabase } from "./config/dbConn.js";
import "dotenv/config";
import postsRoutes from "./routes/postRoutes.js";
import usersRoutes from "./routes/user.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import expressMongoSanitize from "@exortek/express-mongo-sanitize";
// import uploadImageRoutes from "./routes/uploadImage.routes.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors());
app.use(helmet());
app.use(expressMongoSanitize());

const limiter = rateLimit({
  windowMs: 1000 * 60 * 15, // 1 minute
  limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: {
    error: "Too many requests",
    message: "You have exceeded the rate limit. Please try again later.",
  },
});

app.use(limiter);

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
// app.use("/api/uploads", uploadImageRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API...");
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorHandler);
app.use(notFound);

// Connect to database FIRST, then start server
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
