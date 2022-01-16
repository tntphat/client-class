import axios from '../axios';

const baseUrl = 'gradeReview/';
export const apiGradeReview = {
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
  addGradeReview: (param) => {
    const url = baseUrl + 'add';
    return axios.post(url, param);
  }
};
