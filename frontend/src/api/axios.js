import axios from "axios";

const api = axios.create({
  baseURL: "http://13.48.47.1:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
