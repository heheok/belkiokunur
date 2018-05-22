import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const apiGet = async ({ endpoint, params }) => {
  return axios
    .get(`${BASE_URL}/${endpoint}`, params)
    .then(({ data }) => {
      if (data.statusCode === 200) {
        return { hasError: false, data: data.payload };
      } else {
        return { hasError: true, data: data };
      }
    })
    .catch(error => {
      return { hasError: true, data: null };
    });
};

export const apiPost = async ({ endpoint, params }) => {
  return axios
    .post(`${BASE_URL}/${endpoint}`, params)
    .then(({ data }) => {
      if (data.statusCode === 200) {
        return { hasError: false, data: data.payload };
      } else {
        return { hasError: true };
      }
    })
    .catch(error => {
      return { hasError: error };
    });
};
