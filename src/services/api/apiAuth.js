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
};
