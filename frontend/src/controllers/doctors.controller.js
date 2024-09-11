import api from './api';

export const getAllDoctors = async () => {
    return await api.get('/doctors');
};

export const getDoctorById = async (id) => {
    return await api.get(`/doctors/${id}`);
};

export const createDoctor = async (doctorData) => {
    return await api.post('/doctors', doctorData);
};

export const updateDoctor = async (doctorData) => {
    return await api.put('/doctors', doctorData);
};

export const deleteDoctor = async (id) => {
    return await api.delete(`/doctors/${id}`);
};
