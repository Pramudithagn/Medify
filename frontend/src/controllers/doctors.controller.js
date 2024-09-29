import api from "../config/api";

export const getAllDoctors = async () => {
    return await api.get('/doctors');
};

export const getDoctorById = async (id) => {
    return await api.get(`/doctors/${id}`);
};

export const createDoctor = async (doctorData) => {
    return await api.post('/doctors/create', doctorData);
};

export const updateDoctor = async (doctorData) => {
    console.log(doctorData)
    return await api.put('/doctors/edit', doctorData);
};

export const deleteDoctor = async (id) => {
    return await api.delete(`/doctors/delete/${id}`);
};
