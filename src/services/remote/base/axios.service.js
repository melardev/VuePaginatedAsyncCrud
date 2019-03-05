import axios from "axios";

let cachedUser = {};
export const setUser = (user) => {
    cachedUser = user;
};

// return an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    responseType: 'json',
    responseEncoding: 'utf8'
});

axiosInstance.interceptors.request.use((config) => {

    if (cachedUser.username)
        config.headers.authorization = "Bearer " + cachedUser.token;

    return config;
}, function (error) {
    return Promise.reject(error);
});

function get(path) {
    return axiosInstance.get(path)
}

function fetchPage(path, query = {page: 1, page_size: 5}) {
    return axiosInstance.get(`${path}?page=${query.page}&page_size=${query.page_size}`)
}

function post(path, data) {
    return axiosInstance.post(path, data);
}

function put(path, data) {
    return axiosInstance.put(path, data);
}

function _delete(path) {
    return axiosInstance.delete(path);
}

export const AxiosService = {
    axiosInstance, get, post, put, delete: _delete, setUser, fetchPage
};
