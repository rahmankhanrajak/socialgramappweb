import axios from "axios";

const http = axios.create({
  baseURL: "https://socialgramapp-z131.onrender.com/api",
});

export default http;
