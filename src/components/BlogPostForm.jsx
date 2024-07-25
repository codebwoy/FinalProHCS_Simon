import PropTypes from "prop-types";
import "./BlogPostForm.css";

export default function BlogPostForm({ addPost }) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData.entries());

    if (typeof addPost === "function") {
      // Assuming addPost is a function that handles the post request to the backend
      addPost(fields);
      event.target.reset();
    } else {
      console.error("addPost is not a function");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input name="title" placeholder="Title" required />
      <input
        name="visitingDate"
        type="date"
        placeholder="Visiting Date"
        required
      />
      <input name="authorName" placeholder="Author's Name" required />
      <input name="authorImage" type="file" accept="image/*" required />
      <input name="image" type="file" accept="image/*" required />
      <textarea name="text" placeholder="Text" required />
      <input name="city" placeholder="City" required />
      <input name="country" placeholder="Country" required />
      <button type="submit">Submit</button>
    </form>
  );
}

// Define PropTypes for the component
BlogPostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};
