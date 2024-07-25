
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author");
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// routes/post.js
const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();

router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.delete("/:id", postController.deletePost);

module.exports = router;
