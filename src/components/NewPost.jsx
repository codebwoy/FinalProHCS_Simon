import PropTypes from "prop-types";
import BlogPostForm from "./BlogPostForm";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import "./NewPost.css";

export default function NewPost({ addPost }) {
  const navigate = useNavigate();

  // Handle adding a post
  const handleAddPost = (postData) => {
    if (typeof addPost === "function") {
      addPost(postData);
      navigate("/"); // Navigate to the home page after the post is added
    } else {
      console.error("addPost is not a function");
    }
  };

  return (
    <div className="post-container">
      <BlogPostForm addPost={handleAddPost} />
      <Footer />
    </div>
  );
}

// Define PropTypes for the component
NewPost.propTypes = {
  addPost: PropTypes.func.isRequired,
};
