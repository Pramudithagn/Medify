import api from "../config/api";

export const getAllPayments = async ({ userRole, id }) => {
  let payments = [];
  if (userRole === "PATIENT") {
    payments = await api.get(`/payments/user/${id}`);
  } else if (userRole === "ADMIN") {
    payments = await api.get("/payments");
  }
  return payments;
};

export const getPaymentById = async (id) => {
  return await api.get(`/payments/${id}`);
};

export const createPayment = async (paymentData) => {
  return await api.post("/payments/create", paymentData);
};

export const updatePayment = async (paymentData) => {
  return await api.put("/payments/edit", paymentData);
};

export const deletePayment = async (id) => {
  return await api.delete(`/payments/delete/${id}`);
};
