
import BlogPostForm from "./BlogPostForm"; // Adjust the path if needed incase i move to other place
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";

export default function AddPost({ addPost }) {
  const navigate = useNavigate();

  const handleAddPost = async (postData) => {
    // Add logic to handle image upload and get the URLs
    const authorImage = postData.authorImage;
    const postImage = postData.image;

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("visitingDate", postData.visitingDate);
    formData.append("authorName", postData.authorName);
    formData.append("authorImage", authorImage);
    formData.append("image", postImage);
    formData.append("text", postData.text);
    formData.append("city", postData.city);
    formData.append("country", postData.country);

    await addPost(formData);

    navigate("/"); //navigate back to home page which is my dashboard after the post is added
  };

  return (
    <div>
      <h2>Add a New Post</h2>
      <BlogPostForm addPost={handleAddPost} />
      <Footer />
    </div>
  );
}
