import { createSlice } from '@reduxjs/toolkit';
import { mockDataTreatments } from '../data/mockData';


const initialState = {
    treatments: mockDataTreatments,
    // treatments: "",
    selectedTreatment: null,
    isCreating: false,
    editModelOpen: false,
  };

const treatmentSlice = createSlice({
  name: 'treatments',
//   initialState: {
//     treatments: mockDataTreatments,
//     selectedTreatment: null,
//     isCreating: false,
//   },
initialState,
  reducers: {
    setTreatments(state, action) {
      state.treatments = action.payload;
    },
    setSelectedTreatment(state, action) {
      state.selectedTreatment = action.payload;
    },
    setIsCreating(state, action) {
      state.isCreating = action.payload;
    },
    setEditModelOpen(state, action) {
        state.editModelOpen = action.payload;
      },
    addTreatment(state, action) {
        console.log(action.payload)
      state.treatments.push(action.payload);
    },
    updateTreatment(state, action) {
        console.log(action.payload)

      const index = state.treatments.findIndex(treatment => treatment.id === action.payload.id);
      if (index !== -1) {
        state.treatments[index] = action.payload;
      }
    },
    deleteTreatment(state, action) {
      state.treatments = state.treatments.filter(treatment => treatment.id !== action.payload);
    },
  },
});

export const {
  setTreatments,
  setSelectedTreatment,
  setIsCreating,
  setEditModelOpen,
  addTreatment,
  updateTreatment,
  deleteTreatment,
} = treatmentSlice.actions;

export default treatmentSlice.reducer;
