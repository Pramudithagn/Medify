import api from "../config/api";

export const getAllPatients = async () => {
    return await api.get('/patients');
};

export const getPatientById = async (id) => {
    return await api.get(`/patients/${id}`);
};

export const getPatientByUuid = async (uuid) => {
    return await api.get(`/patients/uuid/${uuid}`);
};

export const createPatient = async (patientData) => {
    return await api.post('/patients/create', patientData);
};

export const updatePatient = async (patientData) => {
    console.log(patientData)
    return await api.put('/patients/edit', patientData);
};

export const assignDoctorToPatient = async (patientId, doctorId) => {
    return await api.put(`/patients/edit/${patientId}/assign-doctor/${doctorId}`);
};

export const deletePatient = async (id) => {
    return await api.delete(`/patients/delete/${id}`);
};
