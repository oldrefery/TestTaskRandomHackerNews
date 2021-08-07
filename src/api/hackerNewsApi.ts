import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
});

instance.interceptors.request.use(
  async config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
