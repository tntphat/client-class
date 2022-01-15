import axios from '../axios';

const baseUrl = 'notification/';
export const apiNotification = {
  getNotifications: (param) => {
    const url = baseUrl;
    return axios.get(url);
  },
  markReadedAll: () => {
    const url = baseUrl;
    return axios.put(url);
  },
  createFinalizedNotifications: (params) => {
    const url = baseUrl;
    return axios.post(url, params);
  },
};
