// import { createSlice } from "@reduxjs/toolkit";
// import { mockDataDoctors } from "../data/mockData";

// const initialState = {
//   doctors: mockDataDoctors,
//   loading: false,
//   error: null,
// };

// const doctorSlice = createSlice({
//   name: "doctors",
//   initialState,
//   reducers: {
//     setDoctors(state, action) {
//       state.doctors = action.payload;
//     },
//     addDoctor(state, action) {
//       state.doctors.push(action.payload);
//     },
//     updateDoctor(state, action) {
//       state.doctors = state.doctors.map((doctor) =>
//         doctor.id === action.payload.id ? action.payload : doctor
//       );
//     },
//     deleteDoctor(state, action) {
//       state.doctors = state.doctors.filter((doctor) => doctor.id !== action.payload);
//     },
//     resetError(state) {
//       state.error = null;
//     },
//   },
// });

// export const {
//   setDoctors,
//   addDoctor,
//   updateDoctor,
//   deleteDoctor,
//   resetError,
// } = doctorSlice.actions;

// export default doctorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
  selectedDoctor: null,
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setDoctors(state, action) {
      console.log(action.payload)
      state.doctors = action.payload;
    },
    addDoctor(state, action) {
      console.log(action.payload)
      state.doctors.push(action.payload);
    },
    updateDoctor(state, action) {
      const index = state.doctors.findIndex(
        (doc) => doc.id === action.payload.id
      );
      if (index !== -1) {
        state.doctors[index] = action.payload;
      }
    },
    deleteDoctor(state, action) {
      state.doctors = state.doctors.filter((doc) => doc.id !== action.payload);
    },
    setSelectedDoctor(state, action) {
      state.selectedDoctor = action.payload;
    },
    clearSelectedDoctor(state) {
      state.selectedDoctor = null;
    },
  },
});

export const {
  setDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  setSelectedDoctor,
  clearSelectedDoctor,
} = doctorSlice.actions;

export default doctorSlice.reducer;
