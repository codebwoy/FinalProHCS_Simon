import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./contexts/BlogContext.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import BlogPostDetail from "./components/BlogPostDetail.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Contact from "./components/Contact.jsx";
import NewPost from "./components/NewPost.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
// import Profile from "./components/Profile.jsx";
import EditBlogPost from "./components/EditBlogPost.jsx";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div>
            <Navbar />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/BlogPostDetail/:id" element={<BlogPostDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/newpost" element={<NewPost />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="/post/:id" element={<EditBlogPost isEdit />} />
            </Routes>

            <div className="App"></div>
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}
