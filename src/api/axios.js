import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:4000'
});

axiosClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default axiosClient;