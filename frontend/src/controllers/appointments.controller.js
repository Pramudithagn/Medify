import api from "../config/api";

export const getAllAppointments = async ({ userRole, id }) => {
  let appointments = [];
  if (userRole === "DOCTOR") {
    appointments = await api.get(`/appointments/doctor/${id}`);
  } else if (userRole === "PATIENT") {
    appointments = await api.get(`/appointments/patient/${id}`);
  } else if (userRole === "ADMIN") {
    appointments = await api.get("/appointments");
  }
  console.log(appointments);
  return appointments;
};

export const getAppointmentById = async (id) => {
  return await api.get(`/appointments/${id}`);
};

export const createAppointment = async (appointmentData) => {
  return await api.post("/appointments/create", appointmentData);
};

export const updateAppointment = async (appointmentData) => {
  return await api.put("/appointments/edit", appointmentData);
};

export const deleteAppointment = async (id) => {
  return await api.delete(`/appointments/delete/${id}`);
};
