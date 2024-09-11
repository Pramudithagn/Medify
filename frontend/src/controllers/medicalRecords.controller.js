import api from './api';

export const getAllMedicalRecords = async () => {
    return await api.get('/medical-records');
};

export const getMedicalRecordById = async (id) => {
    return await api.get(`/medical-records/${id}`);
};

export const createMedicalRecord = async (recordData) => {
    return await api.post('/medical-records', recordData);
};

export const updateMedicalRecord = async (recordData) => {
    return await api.put('/medical-records', recordData);
};

export const deleteMedicalRecord = async (id) => {
    return await api.delete(`/medical-records/${id}`);
};
