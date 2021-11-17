import axios from '../axios';

const baseUrl = 'user/';
export const apiUser = {
  createUser: (params) => {
    const url = baseUrl;
    return axios.post(url, params);
  },
  login: (params) => {
    const url = baseUrl + 'login';
    return axios.post(url, params);
  },
};
