export const notificationMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith('notifications/')) {
    const state = store.getState();
    localStorage.setItem(
      'notifications',
      JSON.stringify(state.notifications.notifications)
    );
  }
};
