import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllDoctors,
  createDoctor as apiCreateDoctor,
  updateDoctor as apiUpdateDoctor,
  deleteDoctor as apiDeleteDoctor,
} from "../controllers/doctors.controller";

// thunks
export const getDoctors = createAsyncThunk(
  "doctors/getAllDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllDoctors();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createDoctor = createAsyncThunk(
  "doctors/createDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await apiCreateDoctor(doctorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDoctor = createAsyncThunk(
  "doctors/updateDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await apiUpdateDoctor(doctorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (doctorId, { rejectWithValue }) => {
    try {
      await apiDeleteDoctor(doctorId);
      return doctorId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = { doctors: [],selectedDoctor: null, loading: false, error: null,};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    clearSelectedDoctor: (state) => {
      state.selectedDoctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload);
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex(
          (doc) => doc.id === action.payload.id
        );
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(
          (doctor) => doctor.id !== action.payload
        );
      });
  },
});

export const { addDoctor, setDoctors, setSelectedDoctor, clearSelectedDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;

//=====================================================================================================================================================================================================================================
