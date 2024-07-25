import axios from "axios";

const API_URL = "http://localhost:3000/api"; //This is same as my backend server

const api = axios.create({
  baseURL: API_URL,
});

export const register = (user) =>
  api.post("/users/register", user).then((response) => response.data);
export const login = (user) =>
  api.post("/users/login", user).then((response) => response.data);
export const getProfile = (token) =>
  api
    .get("/users/profile", { headers: { Authorization: token } })
    .then((response) => response.data);
export const updateProfile = (user, token) =>
  api
    .put("/users/profile", user, { headers: { Authorization: token } })
    .then((response) => response.data);

export const getBlogPosts = () =>
  api.get("/blogposts").then((response) => response.data);
export const createBlogPost = (post, token) =>
  api
    .post("/blogposts", post, { headers: { Authorization: token } })
    .then((response) => response.data);
export const updateBlogPost = (id, post, token) =>
  api
    .put(`/blogposts/${id}`, post, { headers: { Authorization: token } })
    .then((response) => response.data);

export default api;
