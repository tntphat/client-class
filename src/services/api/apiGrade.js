import axios from '../axios';

const baseUrl = 'grade/';
export const apiGrade = {
  updateClassGrade: (param) => {
    const url = baseUrl + 'updateClassGrade';
    return axios.post(url , param);
  },
  getClassGrade: (courseId) => {
    const url = baseUrl + 'getClassGrade/';
    return axios.get(url + `${courseId}`);
  },
  getStudentGrade: (param) => {
    const url = baseUrl + 'getStudentGrade';
    return axios.post(url , param);
  },
};
