import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import multer from "multer";
import BlogPost from "./backend/models/BlogPost.js";
import authRoutes from "./backend/routes/authRoutes.js";
import { authenticateToken } from "./middleware/auth.js";

// Load environment variables from .env file
dotenv.config();

// Access the JWT secret key and MongoDB URI from the environment variables
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

// Express server setup
const server = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "static" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use(express.static(path.join(__dirname, "static")));
server.use(express.json());

// Enable CORS
server.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Authentication routes
server.use("/auth", authRoutes);

// CRUD Routes for Blog Posts
server.get("/api/blogposts", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find(); // Fetch all blog posts
    console.log("Documents in the collection:", blogPosts);
    res.json(blogPosts);
  } catch (e) {
    console.error("Failed to fetch documents:", e);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

server.post(
  "/api/blogposts",
  authenticateToken,
  upload.fields([{ name: "authorImage" }, { name: "image" }]),
  async (req, res) => {
    try {
      const { title, visitingDate, authorName, text, city, country } = req.body;
      const authorImage = `/images/${req.files.authorImage[0].filename}`;
      const image = `/images/${req.files.image[0].filename}`;

      const newBlogPost = new BlogPost({
        title,
        visitingDate,
        author: { name: authorName, image: authorImage },
        image,
        text,
        location: { city, country },
      });

      const savedBlogPost = await newBlogPost.save();
      res.status(201).json(savedBlogPost);
    } catch (err) {
      res.status(400).json({ error: "Failed to create blog post" });
    }
  }
);

server.get("/api/blogposts/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

server.put("/api/blogposts/:id", authenticateToken, async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ error: "Failed to update blog post" });
  }
});

server.delete("/api/blogposts/:id", authenticateToken, async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});

const startServer = (port) => {
  server
    .listen(port, () => {
      console.log(`Server is running on port ${port}`);

      mongoose.Promise = global.Promise;
      mongoose
        .connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("Database Connected Successfully!!");
        })
        .catch((err) => {
          console.log("Could not connect to the database", err);
          process.exit();
        });
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(
          `Port ${port} is already in use, trying port ${port + 1}...`
        );
        startServer(port + 1);
      } else {
        console.error(err);
        process.exit(1);
      }
    });
};

startServer(PORT);
