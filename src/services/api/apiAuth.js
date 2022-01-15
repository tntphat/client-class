import axios from '../axios';

const baseUrl = 'auth/';
export const apiAuth = {
  register: (params) => {
    const url = baseUrl + 'register';
    return axios.post(url, params);
  },
  login: (params) => {
    const url = baseUrl + 'login';
    return axios.post(url, params);
  },
  socialLogin: (params) => {
    const url = baseUrl + 'socialLogin';
    return axios.post(url, params);
  },
  changePassword: (params) => {
    const url = baseUrl + 'changePassword';
    return axios.post(url, params);
  },
  renewPassword: (params) => {
    const url = baseUrl + 'renewPassword';
    return axios.post(url, params);
  },
};
