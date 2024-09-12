import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEvents: [],
  newAppointment: {
    title: "",
    patientId: null,
    doctorId: null,
  },
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.currentEvents = action.payload;
    },
    addEvent: (state, action) => {
      state.currentEvents.push(action.payload);
    },
    removeEvent: (state, action) => {
      state.currentEvents = state.currentEvents.filter(
        (event) => event.id !== action.payload.id
      );
    },
    updateEvent: (state, action) => {
      const index = state.currentEvents.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.currentEvents[index] = action.payload;
      }
    },
    setNewAppointment: (state, action) => {
      state.newAppointment = {
        ...state.newAppointment,
        ...action.payload,
      };
    },
    resetNewAppointment: (state) => {
      state.newAppointment = {
        title: "",
        patientId: null,
        doctorId: null,
      };
    },
  },
});

export const {
  setEvents,
  addEvent,
  removeEvent,
  updateEvent,
  setNewAppointment,
  resetNewAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
