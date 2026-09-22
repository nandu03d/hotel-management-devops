import axios from "axios";

const api = axios.create({
  baseURL: "http://13.63.44.9:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
