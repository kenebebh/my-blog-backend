import express from "express";
import { connectDatabase } from "./config/dbConn.js";
import "dotenv/config";
import postsRoutes from "./routes/postRoutes.js";
import usersRoutes from "./routes/user.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import Post from "./models/postsModel.js";
import posts from "./posts.json" with { type: "json" };

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors());

// console.log(posts);



app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
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
