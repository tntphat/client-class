import axios from '../axios';

const baseUrl = 'courses/';
export const apiClasses = {
  getClasses: () => {
    const url = baseUrl;
    return axios.get(url);
  },
  getClassDetail: (param) => {
    const url = baseUrl + param;
    return axios.get(url);
  },
  inviteByEmail: (param) => {
    const url = baseUrl + "sendInvitation";
    return axios.post(url, param);
  },
  inviteByLink: (param) => {
    const url = baseUrl + "createInvitationLink";
    return axios.post(url, param);
  },
  addClass: (param) => {
    const url = baseUrl;
    return axios.post(url, param);
  },
};
