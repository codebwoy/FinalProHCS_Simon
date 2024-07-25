import express from "express";
import multer from "multer";
import BlogPost from "../models/BlogPost.js"; // Import the BlogPost model

const router = express.Router();

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

// CRUD Routes for Blog Posts

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// Create a new blog post
router.post(
  "/",
  upload.fields([{ name: "authorImage" }, { name: "image" }]),
  async (req, res) => {
    try {
      const { title, visitingDate, authorName, text, city, country } = req.body;
      const authorImage = req.files.authorImage
        ? `/images/${req.files.authorImage[0].filename}`
        : undefined;
      const image = req.files.image
        ? `/images/${req.files.image[0].filename}`
        : undefined;

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

// Get a specific blog post by ID
router.get("/:id", async (req, res) => {
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

// Update a specific blog post by ID
router.put("/:id", async (req, res) => {
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

// Delete a specific blog post by ID
router.delete("/:id", async (req, res) => {
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

export default router;
