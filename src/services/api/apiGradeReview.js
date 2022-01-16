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
  },
  getAllGradeReview: (id) => {
    const url = baseUrl + 'getAll/'+ id;
    return axios.get(url);
  },
  getAllStudentGradeReview: (id) => {
    const url = baseUrl + 'getAllOf/'+ id;
    return axios.get(url);
  },
  getStudentGradeReview: (param) => {
    const url = baseUrl + 'get';
    return axios.post(url, param);
  },
  getGradeReviewDetail: (id) => {
    const url = baseUrl + 'get/'+ id;
    return axios.get(url);
  },
  updateScoreAndStatus: (param) => {
    const url = baseUrl + 'updateScoreAndStatus';
    return axios.post(url, param);
  },
  addComment: (param) => {
    const url = baseUrl + 'addComment';
    return axios.post(url, param);
  },

};
