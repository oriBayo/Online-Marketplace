import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: localStorage.getItem('notifications')
    ? JSON.parse(localStorage.getItem('notifications'))
    : [],
};

const notificationSlice = createSlice({
  initialState: initialState,
  name: 'notifications',
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload
      );
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.isRead = true;
      });
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    removeNotification: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload.id
      );
      if (notification) {
        state.notifications = state.notifications.filter(
          (n) => n.id !== action.payload.id
        );
      }
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
