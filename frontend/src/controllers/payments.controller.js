import api from "../config/api";
const { userRole, id } = JSON.parse(localStorage.getItem("userDetails")) || {};

export const getAllPayments = async () => {
    // const id = 2
    // const userRole = "PATIENT"
    let payments = []
    if(userRole === "PATIENT"){
        payments = await api.get(`/payments/user/${id}`)
    }
    else if(userRole === "ADMIN"){
        payments = await api.get('/payments')
    }
    console.log(payments);
    return payments;
};

// export const getPaymentsByUserId = async (id) => {
//     return await api.get(`/payments/user/${id}`);
// };

export const getPaymentById = async (id) => {
    return await api.get(`/payments/${id}`);
};

export const createPayment = async (paymentData) => {
    return await api.post('/payments/create', paymentData);
};

export const updatePayment = async (paymentData) => {
    return await api.put('/payments/edit', paymentData);
};

export const deletePayment = async (id) => {
    return await api.delete(`/payments/delete/${id}`);
};
