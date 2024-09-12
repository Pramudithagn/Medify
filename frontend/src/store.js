import { configureStore } from "@reduxjs/toolkit";
import patientReducer from './features/patientSlice';
import recordReducer from "./features/recordSlice";
import doctorReducer from "./features/doctorSlice";
// import appointmentReducer from './features/appointmentSlice';
import paymentReducer from "./features/paymentSlice";
import treatmentReducer from "./features/treatmentSlice";

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    record: recordReducer,
    doctor: doctorReducer,
    // appointment: appointmentReducer,
    payment: paymentReducer,
    treatment: treatmentReducer,
  },
});
