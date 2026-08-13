import api from "../api/axios";

const DELIVERY_API = "/deliveries";

export const getAllDeliveries = () => {
    return api.get(DELIVERY_API);
};

export const getDeliveryById = (id) => {
    return api.get(`${DELIVERY_API}/${id}`);
};

export const createDelivery = (delivery) => {
    return api.post(DELIVERY_API, delivery);
};

export const updateDelivery = (id, delivery) => {
    return api.put(`${DELIVERY_API}/${id}`, delivery);
};

export const deleteDelivery = (id) => {
    return api.delete(`${DELIVERY_API}/${id}`);
};