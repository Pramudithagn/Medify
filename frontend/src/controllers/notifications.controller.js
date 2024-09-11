import api from './api';

export const getNotificationsForUser = async (userId) => {
    return await api.get(`/notifications/${userId}`);
};

export const markNotificationAsRead = async (id) => {
    return await api.put(`/notifications/mark-read/${id}`);
};
