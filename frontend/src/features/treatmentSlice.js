// import { createSlice } from "@reduxjs/toolkit";
// import { mockDataTreatments } from "../data/mockData";
// import {
//   getAllTreatments,
//   createTreatment as createTreatmentApi,
//   updateTreatment as updateTreatmentApi,
// } from "../controllers/treatments.controller";

// const initialState = { treatments: [], selectedTreatment: null, isCreating: false, editModelOpen: false,};

// const treatmentSlice = createSlice({
//   name: "treatments",
//   initialState,
//   reducers: {
//     setTreatments(state, action) {
//       state.treatments = action.payload;
//     },
//     setSelectedTreatment(state, action) {
//       state.selectedTreatment = action.payload;
//     },
//     setIsCreating(state, action) {
//       state.isCreating = action.payload;
//     },
//     setEditModelOpen(state, action) {
//       state.editModelOpen = action.payload;
//     },
//     addTreatment(state, action) {
//       state.treatments.push(action.payload);
//     },
//     editTreatment(state, action) {
//       const index = state.treatments.findIndex( (treatment) => treatment.id === action.payload.id );
//       if (index !== -1) { state.treatments[index] = action.payload; }
//     },
//     deleteTreatment(state, action) {
//       state.treatments = state.treatments.filter( (treatment) => treatment.id !== action.payload);
//     },
//   },
// });

// // Thunks
// export const fetchTreatments = () => async (dispatch) => {
//   try {
//     const response = await getAllTreatments();
//     dispatch(setTreatments(response.data));
//   } catch (error) {
//     console.error("Error fetching treatments:", error);
//   }
// };
// export const createTreatment = (treatmentData) => async (dispatch) => {
//   try {
//     const response = await createTreatmentApi(treatmentData);
//     dispatch(addTreatment(response.data));
//   } catch (error) {
//     console.error("Error creating treatment:", error.response.data);
//   }
// };
// export const updateTreatment = (treatmentData) => async (dispatch) => {
//   try {
//     const response = await updateTreatmentApi(treatmentData);
//     dispatch(editTreatment(response.data));
//   } catch (error) {
//     console.error("Error updating treatment:", error);
//   }
// };

// export const { setTreatments, setSelectedTreatment, setIsCreating, setEditModelOpen, addTreatment, editTreatment, deleteTreatment,} = treatmentSlice.actions;

// export default treatmentSlice.reducer;

// //=====================================================================================================================================================================================================================================

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTreatments,
  createTreatment as createTreatmentApi,
  updateTreatment as updateTreatmentApi,
} from "../controllers/treatments.controller";

const initialState = {
  treatments: [],
  selectedTreatment: null,
  isCreating: false,
  editModelOpen: false,
  loading: false,
};

const treatmentSlice = createSlice({
  name: "treatments",
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
      state.treatments.push(action.payload);
    },
    editTreatment(state, action) {
      const index = state.treatments.findIndex((treatment) => treatment.id === action.payload.id);
      if (index !== -1) {
        state.treatments[index] = action.payload;
      }
    },
    deleteTreatment(state, action) {
      state.treatments = state.treatments.filter((treatment) => treatment.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Thunks
export const fetchTreatments = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await getAllTreatments();
    dispatch(setTreatments(response.data));
  } catch (error) {
    console.error("Error fetching treatments:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTreatment = (treatmentData) => async (dispatch) => {
  dispatch(setLoading(true)); 
  try {
    const response = await createTreatmentApi(treatmentData);
    dispatch(addTreatment(response.data));
  } catch (error) {
    console.error("Error creating treatment:", error.response.data);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTreatment = (treatmentData) => async (dispatch) => {
  dispatch(setLoading(true)); 
  try {
    const response = await updateTreatmentApi(treatmentData);
    dispatch(editTreatment(response.data));
  } catch (error) {
    console.error("Error updating treatment:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  setTreatments,
  setSelectedTreatment,
  setIsCreating,
  setEditModelOpen,
  addTreatment,
  editTreatment,
  deleteTreatment,
  setLoading,
} = treatmentSlice.actions;

export default treatmentSlice.reducer;
