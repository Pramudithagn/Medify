import api from "../config/api";

export const getAllPatients = async () => {
    return await api.get('/patients');
};

export const getPatientById = async (id) => {
    return await api.get(`/patients/${id}`);
};

export const createPatient = async (patientData) => {
    return await api.post('/patients', patientData);
};

export const updatePatient = async (patientData) => {
    return await api.put('/patients', patientData);
};

export const assignDoctorToPatient = async (patientId, doctorId) => {
    return await api.put(`/patients/${patientId}/assign-doctor/${doctorId}`);
};

export const deletePatient = async (id) => {
    return await api.delete(`/patients/${id}`);
};
