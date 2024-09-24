import api from "../config/api";

export const getAllPayments = async () => {
    return await api.get('/payments');
};

export const getPaymentById = async (id) => {
    return await api.get(`/payments/${id}`);
};

export const createPayment = async (paymentData) => {
    return await api.post('/payments', paymentData);
};

export const updatePayment = async (paymentData) => {
    return await api.put('/payments', paymentData);
};

export const deletePayment = async (id) => {
    return await api.delete(`/payments/${id}`);
};
