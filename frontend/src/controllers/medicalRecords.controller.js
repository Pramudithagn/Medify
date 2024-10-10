import api from "../config/api";

export const getAllMedicalRecords = async ({ userRole, id }) => {
  let records = [];
  if (userRole === "DOCTOR") {
    records = await api.get(`/medical-records/doctor/${id}`);
  } else if (userRole === "PATIENT") {
    records = await api.get(`/medical-records/patient/${id}`);
  } else if (userRole === "ADMIN") {
    records = await api.get("/medical-records");
  }
  return records;
};

export const getMedicalRecordById = async (id) => {
  return await api.get(`/medical-records/${id}`);
};

export const createMedicalRecord = async (recordData) => {
  return await api.post("/medical-records/create", recordData);
};

export const updateMedicalRecord = async (recordData) => {
  return await api.put("/medical-records/edit", recordData);
};

export const deleteMedicalRecord = async (id) => {
  return await api.delete(`/medical-records/delete/${id}`);
};
