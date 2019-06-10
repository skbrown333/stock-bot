"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var axios = axios_1["default"].create({
    baseURL: "https://cloud.iexapis.com/stable",
    timeout: 300000
});
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with the response error
    return Promise.reject();
});
exports["default"] = axios;
