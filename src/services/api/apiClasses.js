import axios from '../axios';

const baseUrl = 'classes/';
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
