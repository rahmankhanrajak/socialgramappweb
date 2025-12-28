import axios from "axios";

const API_BASE = "https://socialgramapp-z131.onrender.com/api/posts";

export const getPosts = (token) =>
  axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createPost = (content, token) =>
  axios.post(
    API_BASE,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );


