import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  selectedPatient: null,
  isUuidDeleted: false,
  deleteButtonEnabled: false,
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients: (state, action) => {
        console.log(action.payload)
      state.patients = action.payload;
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    setIsUuidDeleted: (state, action) => {
      state.isUuidDeleted = action.payload;
    },
    setDeleteButtonEnabled: (state, action) => {
      state.deleteButtonEnabled = action.payload;
    },
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action) => {
      state.patients = state.patients.map((patient) =>
        patient.id === action.payload.id ? action.payload : patient
      );
    },
    deletePatient: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload
      );
    },
  },
});

export const {
  setPatients,
  setSelectedPatient,
  setIsUuidDeleted,
  setDeleteButtonEnabled,
  addPatient,
  updatePatient,
  deletePatient,
} = patientSlice.actions;

export default patientSlice.reducer;
