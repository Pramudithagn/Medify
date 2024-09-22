// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentEvents: [],
//   newAppointment: {
//     title: "",
//     patientId: null,
//     doctorId: null,
//   },
// };

// const appointmentSlice = createSlice({
//   name: "appointments",
//   initialState,
//   reducers: {
//     setEvents: (state, action) => {
//       state.currentEvents = action.payload;
//     },
//     addEvent: (state, action) => {
//       // state.currentEvents.push(action.payload);

//       const eventExists = state.currentEvents.some(event => event.id === action.payload.id);
//       if (!eventExists) {
//         state.currentEvents.push(action.payload);
//         console.log("Added event to state:", action.payload);
//       } else {
//         console.log("Event already exists in state:", action.payload);
//       }
//     },
//     removeEvent: (state, action) => {
//       state.currentEvents = state.currentEvents.filter(
//         (event) => event.id !== action.payload.id
//       );
//     },
//     updateEvent: (state, action) => {
//       // const index = state.currentEvents.findIndex(
//       //   (event) => event.id === action.payload.id
//       // );
//       // if (index !== -1) {
//       //   state.currentEvents[index] = action.payload;
//       // }

//       state.currentEvents = state.currentEvents.map((event) =>
//         event.id === action.payload.id ? action.payload : event
//       );
//     },
//     setNewAppointment: (state, action) => {
//       state.newAppointment = {
//         ...state.newAppointment,
//         ...action.payload,
//       };
//     },
//     resetNewAppointment: (state) => {
//       state.newAppointment = {
//         title: "",
//         patientId: null,
//         doctorId: null,
//       };
//     },
//   },
// });

// export const {
//   setEvents,
//   addEvent,
//   removeEvent,
//   updateEvent,
//   setNewAppointment,
//   resetNewAppointment,
// } = appointmentSlice.actions;

// export default appointmentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    addAppointment: (state, action) => {
      console.log(action.payload);
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(
        (appt) => appt.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (appt) => appt.id !== action.payload
      );
    },
  },
});

export const {
  setAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
