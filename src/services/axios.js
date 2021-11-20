import axios from 'axios';
import { LOCAL_STORAGE_TOKEN } from '../constants';
import { readCookie } from '../helpers';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_SERVER_LOCAL
    : process.env.REACT_APP_SERVER_CLASSES_MANAGER_URL;
const token = readCookie(LOCAL_STORAGE_TOKEN);
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZW1haWwiOiJlbTMyMjExIn0sImlhdCI6MTYzNzM5MjMxOX0.PzL3P0UWn8gLhruKn6D0KebHHEsI46QXx3RPEMNgndI';
const axiosMy = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    Authorization: `bearer ${token}`,
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
