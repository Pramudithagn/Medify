import api from './api';

export const getAllTreatments = async () => {
    return await api.get('/treatments');
};

export const getTreatmentById = async (id) => {
    return await api.get(`/treatments/${id}`);
};

export const createTreatment = async (treatmentData) => {
    return await api.post('/treatments', treatmentData);
};

export const updateTreatment = async (treatmentData) => {
    return await api.put('/treatments', treatmentData);
};

export const changeTreatmentStatus = async (id) => {
    return await api.put(`/treatments/change-status/${id}`);
};

export const deleteTreatment = async (id) => {
    return await api.delete(`/treatments/${id}`);
};
