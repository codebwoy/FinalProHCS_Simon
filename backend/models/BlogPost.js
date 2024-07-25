
import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    visitingDate: { type: Date, required: true },
    author: {
      name: { type: String, required: true },
      image: { type: String },
    },
    image: { type: String },
    text: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BlogPost", BlogPostSchema);
