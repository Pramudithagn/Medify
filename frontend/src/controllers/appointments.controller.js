import api from "../config/api";

export const getAllAppointments = async () => {
    return await api.get('/appointments');
};

export const getAppointmentById = async (id) => {
    return await api.get(`/appointments/${id}`);
};

export const createAppointment = async (appointmentData) => {
    return await api.post('/appointments', appointmentData);
};

export const updateAppointment = async (appointmentData) => {
    return await api.put('/appointments', appointmentData);
};

export const deleteAppointment = async (id) => {
    return await api.delete(`/appointments/${id}`);
};
