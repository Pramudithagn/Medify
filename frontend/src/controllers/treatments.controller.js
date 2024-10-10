import api from "../config/api";

export const getAllTreatments = async () => {
  return await api.get("/treatments");
};

export const getTreatmentById = async (id) => {
  return await api.get(`/treatments/${id}`);
};

export const createTreatment = async (treatmentData) => {
  return await api.post("/treatments/create", treatmentData);
};

export const updateTreatment = async (treatmentData) => {
  console.log(treatmentData);
  return await api.put("/treatments/edit", treatmentData);
};

export const changeTreatmentStatus = async (id) => {
  return await api.put(`/treatments/edit/change-status/${id}`);
};

export const deleteTreatment = async (id) => {
  return await api.delete(`/treatments/delete/${id}`);
};
