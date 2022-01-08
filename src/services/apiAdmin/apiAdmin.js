import axios from '../axiosAdmin';

const baseUrl = 'admin/';
export const apiAdmin = {
  create: (params) => {
    const url = baseUrl + 'create';
    return axios.post(url, params);
  },
  login: (params) => {
    const url = baseUrl + 'login';
    return axios.post(url, params);
  },
  getInforAdmin: () => {
    const url = baseUrl;
    return axios.get(url);
  },
  getAllAdmins: () => {
    const url = baseUrl + 'getAllAdmins';
    return axios.get(url);
  },
  getAdminDetail: (userName) => {
    const url = baseUrl + 'getAdminDetail/' + userName;
    return axios.get(url);
  },
  getAllUsers: () => {
    const url = baseUrl + 'getAllUsers';
    return axios.get(url);
  },
  getUserDetail: (userName) => {
    const url = baseUrl + 'getUserDetail/' + userName;
    return axios.get(url);
  },
  banUser: (id) => {
    const url = baseUrl + 'banUser/';
    return axios.post(url, { id });
  },
  unBanUser: (id) => {
    const url = baseUrl + 'unbanUser/';
    return axios.post(url, { id });
  },
  getAllUsers: () => {
    const url = baseUrl + 'getAllUsers';
    return axios.get(url);
  },

  getAllClasses: () => {
    const url = baseUrl + 'getAllClasses';
    return axios.get(url);
  },
};
