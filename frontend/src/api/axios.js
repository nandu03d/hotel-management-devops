import axios from "axios";

const api = axios.create({
  baseURL: "http://16.171.53.136:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
