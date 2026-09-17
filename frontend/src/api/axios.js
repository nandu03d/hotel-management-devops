import axios from "axios";

const api = axios.create({
  baseURL: "http://13.53.245.81:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
