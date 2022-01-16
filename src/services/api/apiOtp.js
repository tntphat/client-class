import axios from '../axios';

const baseUrl = 'otp/';
export const apiOtp = {
  requestOtp: (params) => {
    const url = baseUrl;
    return axios.post(url, params);
  },
  registerOtp: (params) => {
    const url = baseUrl + 'registerOtp';
    return axios.post(url, params);
  },
};
