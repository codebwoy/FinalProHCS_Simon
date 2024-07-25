import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./BlogPost.css";

export default function BlogPost({ blog }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${blog.id}`);
  };

  return (
    <div className="preview" onClick={handleClick}>
      <div className="image-container">
        <img src={blog.image} alt={blog.title} />
      </div>
      <h3>{blog.title}</h3>
      <p>{blog.visitingDate}</p>
      <div className="author-info">
        <img src={blog.author.image} alt={blog.author.name} />
        <span>{blog.author.name}</span>
      </div>
    </div>
  );
}
BlogPost.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    visitingDate: PropTypes.string.isRequired,
    author: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
