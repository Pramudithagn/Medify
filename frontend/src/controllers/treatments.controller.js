import api from "../config/api";

export const getAllTreatments = async () => {
  return await api.get("/treatments");

  // const body = await api.get('/treatments');
  // return body.data
};

export const getTreatmentById = async (id) => {
  return await api.get(`/treatments/${id}`);
};

export const createTreatment = async (treatmentData) => {
  console.log(treatmentData);
  return await api.post("/treatments", treatmentData);
};

export const updateTreatment = async (treatmentData) => {
  console.log(treatmentData);
  return await api.put("/treatments", treatmentData);
};

export const changeTreatmentStatus = async (id) => {
  return await api.put(`/treatments/change-status/${id}`);
};

export const deleteTreatment = async (id) => {
  return await api.delete(`/treatments/${id}`);
};
