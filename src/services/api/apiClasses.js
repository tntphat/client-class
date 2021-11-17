import axios from '../axios';

const baseUrl = 'courses/';
export const apiClasses = {
  getClasses: () => {
    const url = baseUrl;
    return axios.get(url);
  },
  addClass: (param) => {
    const url = baseUrl;
    return axios.post(url, param);
  },
};
