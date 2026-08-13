import api from "../api/axios";

const DRIVER_API = "/drivers";

export const getAllDrivers = () => {
    return api.get(DRIVER_API);
};

export const getDriverById = (id) => {
    return api.get(`${DRIVER_API}/${id}`);
};

export const createDriver = (driver) => {
    return api.post(DRIVER_API, driver);
};

export const updateDriver = (id, driver) => {
    return api.put(`${DRIVER_API}/${id}`, driver);
};

export const deleteDriver = (id) => {
    return api.delete(`${DRIVER_API}/${id}`);
};