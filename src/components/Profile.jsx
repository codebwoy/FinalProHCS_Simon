import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/users/profile", {
        userId: user._id,
        name,
        profileImage,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleProfileUpdate}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        placeholder="Profile Image URL"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}
