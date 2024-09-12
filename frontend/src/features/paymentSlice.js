import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  selectedPayment: null,
  isCreating: false,
  isLoading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    updatePaymentStatus: (state, action) => {
      const { id, status } = action.payload;
      state.payments = state.payments.map((payment) =>
        payment.id === id ? { ...payment, status } : payment
      );
    },
    updatePaymentMethod: (state, action) => {
      const { id, method } = action.payload;
      state.payments = state.payments.map((payment) =>
        payment.id === id ? { ...payment, method } : payment
      );
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsCreating: (state, action) => {
      state.isCreating = action.payload;
    },
  },
});

export const {
  setPayments,
  setSelectedPayment,
  updatePaymentStatus,
  updatePaymentMethod,
  setIsLoading,
  setIsCreating,
} = paymentSlice.actions;

export default paymentSlice.reducer;
