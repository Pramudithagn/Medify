import { createSlice } from '@reduxjs/toolkit';
import { mockDataNotifications } from '../data/mockData';

const initialState = {
  notifications: mockDataNotifications,
  unreadCount: mockDataNotifications.length,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
      state.unreadCount = state.notifications.length;
    },
    toggleDropdown: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { markAsRead, toggleDropdown } = notificationSlice.actions;
export default notificationSlice.reducer;
