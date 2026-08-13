import api from "../api/axios";

export const askAI = (request) => {
    return api.post("/ai/ask", request);
};