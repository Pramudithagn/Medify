import api from "../config/api";

export const getNotificationsForUser = async (userId, userType) => {
  return await api.get(`/notifications/${userId}`, {
    params: { userType },
  });
};

export const markNotificationAsRead = async (id) => {
  return await api.put(`/notifications/mark-read/${id}`);
};
