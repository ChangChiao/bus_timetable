import axios from "axios";

const service = axios.create();

service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return error;
    }
);

service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
