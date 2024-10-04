import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPatients, createPatient as apiCreatePatient, updatePatient as apiUpdatePatient, deletePatient as apiDeletePatient, assignDoctorToPatient } from "../controllers/patients.controller";

//  Thunks
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => { const response = await getAllPatients(); return response.data; }
);
export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (newPatient) => { const response = await apiCreatePatient(newPatient); return response.data; }
);
export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async ({ selectedPatient, updatedPatient }) => { const response = await apiUpdatePatient(updatedPatient); return response.data; }
);
export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id) => { await apiDeletePatient(id); return id; }
);

const patientSlice = createSlice({
  name: "patient",
  initialState: { patients: [], selectedPatient: null, isUuidDeleted: false, deleteButtonEnabled: false, loading: false, error: null, },
  reducers: {
    setSelectedPatient: (state, action) => { state.selectedPatient = action.payload; },
    setIsUuidDeleted: (state, action) => { state.isUuidDeleted = action.payload; },
    setDeleteButtonEnabled: (state, action) => { state.deleteButtonEnabled = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => { state.loading = true; })
      .addCase(fetchPatients.fulfilled, (state, action) => { state.loading = false; state.patients = action.payload; })
      .addCase(fetchPatients.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(createPatient.fulfilled, (state, action) => { state.patients.push(action.payload); })
      .addCase(updatePatient.fulfilled, (state, action) => { const index = state.patients.findIndex(patient => patient.id === action.payload.id); if (index !== -1) { state.patients[index] = action.payload; } })
      .addCase(deletePatient.fulfilled, (state, action) => { state.patients = state.patients.filter(patient => patient.id !== action.payload); });
  },
});

export const { addPatient, setSelectedPatient, setIsUuidDeleted, setDeleteButtonEnabled,} = patientSlice.actions;
export default patientSlice.reducer;

//=====================================================================================================================================================================================================================================
