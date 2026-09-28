import axios from "axios";

const api = axios.create({
  baseURL: "http://16.192.167.6:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
