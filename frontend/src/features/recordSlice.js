// import { createSlice } from '@reduxjs/toolkit';

// const recordSlice = createSlice({
//   name: 'record',
//   initialState: [],
//   reducers: {
//     setRecords: (state, action) => action.payload,
//     addRecord: (state, action) => {
//       state.push(action.payload);
//     },
//     updateRecord: (state, action) => {
//       const index = state.findIndex(record => record.id === action.payload.id);
//       if (index !== -1) {
//         state[index] = action.payload;
//       }
//     },
//     deleteRecord: (state, action) => {
//       return state.filter(record => record.id !== action.payload);
//     },
//   },
// });

// export const { setRecords, addRecord, updateRecord, deleteRecord } = recordSlice.actions;
// export default recordSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  mockDataRecords,
} from "../data/mockData";

const initialState = {
  // records: [],
  records: mockDataRecords,
  selectedRecord: null,
  createModelOpen: false,
  editModelOpen: false,
  deleteModelOpen: false,
  filterText: "",
  currentPage: 1,
  recordsPerPage: 5,
};

const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords(state, action) {
      state.records = action.payload;
    },
    addRecord(state, action) {
      state.records.push(action.payload);
    },
    updateRecord(state, action) {
      state.records = state.records.map((record) =>
        record.id === action.payload.id ? action.payload : record
      );
    },
    deleteRecord(state, action) {
      state.records = state.records.filter(
        (record) => record.id !== action.payload
      );
    },
    setSelectedRecord(state, action) {
      state.selectedRecord = action.payload;
    },
    setCreateModelOpen(state, action) {
      state.createModelOpen = action.payload;
    },
    setEditModelOpen(state, action) {
      state.editModelOpen = action.payload;
    },
    setDeleteModelOpen(state, action) {
      state.deleteModelOpen = action.payload;
    },
    setFilterText(state, action) {
      state.filterText = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setRecordsPerPage(state, action) {
      state.recordsPerPage = action.payload;
    },
  },
});

export const {
  setRecords,
  addRecord,
  updateRecord,
  deleteRecord,
  setSelectedRecord,
  setCreateModelOpen,
  setEditModelOpen,
  setDeleteModelOpen,
  setFilterText,
  setCurrentPage,
  setRecordsPerPage,
} = recordSlice.actions;

export default recordSlice.reducer;
