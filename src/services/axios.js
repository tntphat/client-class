import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_SERVER_LOCAL
    : process.env.REACT_APP_SERVER_CLASSES_MANAGER_URL;

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
    throw err;
  },
);
export default axiosMy;
