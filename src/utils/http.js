import axios from "axios";
import { showToast } from "@/utils/common";
import { getToken } from "@/utils/api";
const service = axios.create({});

service.interceptors.request.use(
    (config) => {
        let params = config.params;
        Object.keys(params).map((vo) => {
            if (!params[vo]) delete params[vo];
        });
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
    async (error) => {
        const status = error?.response?.status;
        showToast(`error--${status}`, "error");
        console.log("status", typeof status);
        if (status === 403 || status === 429) {
            const res = await getToken();
            console.log("res", res);
            if (res.access_token) {
                localStorage.setItem("token", res.access_token);
            }
        }
        return Promise.reject(error);
    }
);

export default service;
