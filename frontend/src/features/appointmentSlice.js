// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   appointments: [],
// };

// const appointmentSlice = createSlice({
//   name: "appointments",
//   initialState,
//   reducers: {
//     setAppointments: (state, action) => {
//       state.appointments = action.payload;
//     },
//     addAppointment: (state, action) => {
//       console.log(action.payload);
//       state.appointments.push(action.payload);
//     },
//     updateAppointment: (state, action) => {
//       const index = state.appointments.findIndex(
//         (appt) => appt.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.appointments[index] = action.payload;
//       }
//     },
//     deleteAppointment: (state, action) => {
//       state.appointments = state.appointments.filter(
//         (appt) => appt.id !== action.payload
//       );
//     },
//   },
// });

// export const {
//   setAppointments,
//   addAppointment,
//   updateAppointment,
//   deleteAppointment,
// } = appointmentSlice.actions;

// export default appointmentSlice.reducer;

//=======================================================================================================================================================================================


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment as createAppointmentApi,
  updateAppointment as updateAppointmentApi,
  deleteAppointment as deleteAppointmentApi,
} from "../controllers/appointments.controller";

const initialState = {
  appointments: [],
  status: "idle",
  error: null,
};

// Thunks 
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllAppointments();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await createAppointmentApi(appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await updateAppointmentApi(appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (id, { rejectWithValue }) => {
    try {
      await deleteAppointmentApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(
          (appt) => appt.id === action.payload.id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(
          (appt) => appt.id !== action.payload
        );
      });
  },
});

export const {
    setAppointments,
  } = appointmentSlice.actions;

export default appointmentSlice.reducer;
