import axios from '../axios';

const baseUrl = 'user/';
export const apiUser = {
  // createUser: (params) => {
  //   const url = baseUrl;
  //   return axios.post(url, params);
  // },
  // login: (params) => {
  //   const url = baseUrl + 'login';
  //   return axios.post(url, params);
  // },
  // authSocial: (params) => {
  //   const url = baseUrl + 'authSocial';
  //   return axios.post(url, params);
  // },
  getUserInClass: (param) => {
    const url = baseUrl + 'getUserInClass';
    return axios.post(url, param);
  },
  getInforUser: () => {
    const url = baseUrl;
    return axios.get(url);
  },
  updateInforUser: (params) => {
    const url = baseUrl;
    return axios.put(url, params);
  },
};
