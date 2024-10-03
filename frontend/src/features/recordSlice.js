// import { createSlice } from "@reduxjs/toolkit";
// import { mockDataRecords } from "../data/mockData";

// const initialState = {
//   records: [],
//   // records: mockDataRecords,
//   selectedRecord: null,
//   createModelOpen: false,
//   editModelOpen: false,
//   deleteModelOpen: false,
//   filterText: "",
//   currentPage: 1,
//   recordsPerPage: 5,
// };

// const recordSlice = createSlice({
//   name: "records",
//   initialState,
//   reducers: {
//     setRecords(state, action) {
//       state.records = action.payload;
//     },
//     addRecord(state, action) {
//       state.records.push(action.payload);
//     },
//     updateRecord(state, action) {
//       state.records = state.records.map((record) =>
//         record.id === action.payload.id ? action.payload : record
//       );
//     },
//     deleteRecord(state, action) {
//       state.records = state.records.filter(
//         (record) => record.id !== action.payload
//       );
//     },
//     setSelectedRecord(state, action) {
//       state.selectedRecord = action.payload;
//     },
//     setCreateModelOpen(state, action) {
//       state.createModelOpen = action.payload;
//     },
//     setEditModelOpen(state, action) {
//       state.editModelOpen = action.payload;
//     },
//     setDeleteModelOpen(state, action) {
//       state.deleteModelOpen = action.payload;
//     },
//     setFilterText(state, action) {
//       state.filterText = action.payload;
//     },
//     setCurrentPage(state, action) {
//       state.currentPage = action.payload;
//     },
//     setRecordsPerPage(state, action) {
//       state.recordsPerPage = action.payload;
//     },
//   },
// });

// export const {
//   setRecords,
//   addRecord,
//   updateRecord,
//   deleteRecord,
//   setSelectedRecord,
//   setCreateModelOpen,
//   setEditModelOpen,
//   setDeleteModelOpen,
//   setFilterText,
//   setCurrentPage,
//   setRecordsPerPage,
// } = recordSlice.actions;

// export default recordSlice.reducer;

//===============================================================================================================================================



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createMedicalRecord, deleteMedicalRecord, getAllMedicalRecords, updateMedicalRecord } from "../controllers/medicalRecords.controller";


//thunks
export const fetchRecords = createAsyncThunk("records/fetchRecords", async ({ userRole, id }) => {
  console.log("records fetch in slice");
  const response = await getAllMedicalRecords({ userRole, id });
  return response.data;
});

export const addRecord = createAsyncThunk("records/addRecord", async (record) => {
  console.log(record)
  const response = await createMedicalRecord(record);
  console.log(response.data)
  return response.data;
});

export const updateRecord = createAsyncThunk("records/updateRecord", async (record) => {
  console.log(record)
  const response = await updateMedicalRecord(record);
  console.log(response.data)
  return response.data;
});

export const deleteRecord = createAsyncThunk("records/deleteRecord", async (recordId) => {
  await deleteMedicalRecord(recordId);
  return recordId;
});

const recordSlice = createSlice({
  name: "record",
  initialState: {
    records: [],
    selectedRecord: null,
    createModelOpen: false,
    editModelOpen: false,
    deleteModelOpen: false,
    filterText: "",
    currentPage: 1,
    recordsPerPage: 5,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedRecord: (state, action) => {
      state.selectedRecord = action.payload;
    },
    setCreateModelOpen: (state, action) => {
      state.createModelOpen = action.payload;
    },
    setEditModelOpen: (state, action) => {
      state.editModelOpen = action.payload;
    },
    setDeleteModelOpen: (state, action) => {
      state.deleteModelOpen = action.payload;
    },
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRecordsPerPage: (state, action) => {
      state.recordsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex((record) => record.id === action.payload.id);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.records = state.records.filter((record) => record.id !== action.payload);
      });
  },
});

export const {
  setRecords,
  setSelectedRecord,
  setCreateModelOpen,
  setEditModelOpen,
  setDeleteModelOpen,
  setFilterText,
  setCurrentPage,
  setRecordsPerPage,
} = recordSlice.actions;

export default recordSlice.reducer;
