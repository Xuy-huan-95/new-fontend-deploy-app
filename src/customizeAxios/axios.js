import axios from "axios"
import { toast } from 'react-toastify';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:3030'
});

instance.defaults.withCredentials = true
// co the set cookie tren

// // Alter defaults after instance has been created
// gan token cho header
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;




// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    console.log(error)

    return Promise.reject(error);
});

// Add a response interceptor
const NO_RETRY_HEADER = 'x-no-retry'

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    // console.log(status)
    switch (status) {
        // authentication (token related issues)
        case 401: {
            if (error.config && error.response && +error.response.status === 401 && !error.config.headers[NO_RETRY_HEADER]) {
                instance.get("/api/v1/Refesh_token").then(response => {
                    error.config.headers[NO_RETRY_HEADER] = 'true'
                    if (response.DT) {
                        error.config.headers['Authorization'] = `Bearer ${response.DT}`
                        localStorage.setItem("jwt", response.DT)


                        return instance.request(error.config);
                    } else {
                        toast.error(response.EM)
                    }
                })
                    .catch((err) => {
                        console.log(err);
                    });
                return error.response.data ?? Promise.reject(error);
            }

        }
        // forbidden (permission related issues)
        case 403: {
            toast.error("you don't have permission to access this page")

            return Promise.reject(error);
        }

        // bad request
        case 400: {

            return Promise.reject(error);
        }

        // not found
        case 404: {
            return Promise.reject(error);
        }

        // conflict
        case 409: {
            return Promise.reject(error);
        }

        // unprocessable
        case 422: {
            return Promise.reject(error);
        }
        case 429: {
            toast.error("Too many requests made from this ip , please try again  after 1 min")

            return Promise.reject(error);

        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(error);
        }
    }
});

export default instance