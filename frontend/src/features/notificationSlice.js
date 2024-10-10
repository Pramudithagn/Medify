import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotificationsForUser,
  markNotificationAsRead,
} from "../controllers/notifications.controller";

// thunk
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async ({ id, userRole }, { rejectWithValue }) => {
    try {
      const response = await getNotificationsForUser(id, userRole);
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

//=====================================================================================================================================================================================================================================
