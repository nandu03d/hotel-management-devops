import api from "../api/axios";

export const getDashboardData = () => {
    return api.get("/dashboard");
};