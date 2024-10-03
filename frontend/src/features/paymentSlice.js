import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPayments,
  updatePayment,
} from "../controllers/payments.controller";

const initialState = {
  payments: [],
  selectedPayment: null,
  isCreating: false,
  isLoading: false,
};

export const fetchPayments = createAsyncThunk(
  "payment/fetchPayments",
  async ({userRole, id}) => {
    const response = await getAllPayments({userRole, id});
    return response.data;
  }
);

export const updatePaymentStatus = createAsyncThunk(
  "payment/updatePaymentStatus",
  async (payment) => {
    const response = await updatePayment(payment);
    return response.data;
  }
);

export const updatePaymentMethod = createAsyncThunk(
  "payment/updatePaymentMethod",
  async (payment) => {
    const response = await updatePayment(payment);
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    setPayments: (state, action) => {
      //       state.payments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.payments = state.payments.map((payment) =>
          payment.id === id ? { ...payment, status } : payment
        );
      })
      // .addCase(updatePaymentMethod.fulfilled, (state, action) => {
      //   const { id, method } = action.payload;
      //   state.payments = state.payments.map((payment) =>
      //     payment.id === id ? { ...payment, method } : payment
      //   );
      // });
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        const updatedPayment = action.payload;
        state.payments = state.payments.map((payment) =>
          payment.id === updatedPayment.id ? updatedPayment : payment
        );
        if (state.selectedPayment?.id === updatedPayment.id) {
          state.selectedPayment = updatedPayment;
        }
      });
  },
});

export const { setSelectedPayment, setPayments } = paymentSlice.actions;

export default paymentSlice.reducer;

//=====================================================================================================================================================================================================================================
