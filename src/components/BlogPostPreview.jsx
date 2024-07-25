import { useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";
import { Link } from "react-router-dom";
import "./BlogPostPreview.css";

export default function BlogPostPreview() {
  const { blogs } = useContext(BlogContext);

  // Sort blogs by visiting date in ascending order
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(a.visitingDate) - new Date(b.visitingDate)
  );

  return (
    <div className="blog-post-preview">
      {sortedBlogs.slice(0, 6).map((blog) => (
        <Link
          to={`/BlogPostDetail/${blog.id}`}
          key={blog.id}
          className="blog-link"
        >
          <div className="blog-item">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-info">
              <h5>{blog.title}</h5>
              <h6>{new Date(blog.visitingDate).toLocaleDateString()}</h6>
              <div className="author">
                <img
                  src={blog.author.image}
                  alt={blog.author.name}
                  className="author-image"
                />
                <p>{blog.author.name}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
