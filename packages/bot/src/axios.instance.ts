import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: "http://localhost:3000/",
  timeout: 300000
});

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Do something with the response error
    return Promise.reject();
  }
);

export default axios;
