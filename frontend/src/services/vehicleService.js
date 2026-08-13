import api from "../api/axios";

const VEHICLE_API = "/vehicles";

export const getAllVehicles = () => {
    return api.get(VEHICLE_API);
};

export const getVehicleById = (id) => {
    return api.get(`${VEHICLE_API}/${id}`);
};

export const createVehicle = (vehicle) => {
    return api.post(VEHICLE_API, vehicle);
};

export const updateVehicle = (id, vehicle) => {
    return api.put(`${VEHICLE_API}/${id}`, vehicle);
};

export const deleteVehicle = (id) => {
    return api.delete(`${VEHICLE_API}/${id}`);
};