import axios from "axios";

const api = axios.create({
  baseURL: "http://13.63.53.186:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
