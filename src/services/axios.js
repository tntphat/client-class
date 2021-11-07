import axios from 'axios';

const baseURL = 'https://server-classes-manager.herokuapp.com/';

const axiosMy = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
  },
});

axiosMy.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // if (err.response.status === 401) {
    // }
    throw err;
  },
);
export default axiosMy;
