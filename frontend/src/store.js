import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import patientReducer from "./features/patientSlice";
import recordReducer from "./features/recordSlice";
import doctorReducer from "./features/doctorSlice";
import appointmentReducer from "./features/appointmentSlice";
import paymentReducer from "./features/paymentSlice";
import treatmentReducer from "./features/treatmentSlice";
import notificationsReducer from "./features/notificationSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    record: recordReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
    payment: paymentReducer,
    treatment: treatmentReducer,
    notification: notificationsReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
