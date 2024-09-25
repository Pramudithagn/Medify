// import { createSlice } from '@reduxjs/toolkit';
// import { mockDataNotifications } from '../data/mockData';

// const initialState = {
//   notifications: mockDataNotifications,
//   unreadCount: mockDataNotifications.length,
// };

// const notificationSlice = createSlice({
//   name: 'notifications',
//   initialState,
//   reducers: {
//     markAsRead: (state, action) => {
//       state.notifications = state.notifications.filter(
//         (notif) => notif.id !== action.payload
//       );
//       state.unreadCount = state.notifications.length;
//     },
//     toggleDropdown: (state, action) => {
//       state.isOpen = !state.isOpen;
//     },
//   },
// });

// export const { markAsRead, toggleDropdown } = notificationSlice.actions;
// export default notificationSlice.reducer;

//=================================================================================================================================================

// src/features/notificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotificationsForUser, markNotificationAsRead } from "../controllers/notifications.controller";

// Async thunk actions
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async ({ userId, userType }, { rejectWithValue }) => {
    try {
      const response = await getNotificationsForUser(userId, userType);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await markNotificationAsRead(notificationId);
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  isOpen: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (notif) => notif.id !== action.payload
        );
        state.unreadCount = state.notifications.filter((n) => !n.read).length;
      });
  },
});

export const { toggleDropdown } = notificationSlice.actions;
export default notificationSlice.reducer;
