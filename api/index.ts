import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

axiosInstance.interceptors.request.use(
  (request) => {
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
