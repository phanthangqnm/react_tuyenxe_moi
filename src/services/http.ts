// src/services/http.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { errorException } from './errorException';

const access_token = 'access_token';
const refresh_token = 'refresh_token';

const API_URL = import.meta.env.VITE_API_URL || 'https://your-api.com';
const url_refesh_token = `${API_URL}/api/users/users_api/refreshtoken`;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

const httpRequest: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// httpRequest.interceptors.request.use((config: AxiosRequestConfig) => {
//   const token = localStorage.getItem(access_token);
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

httpRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(access_token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Tự động refresh token nếu access_token hết hạn
httpRequest.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem(refresh_token)
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await axios.post(url_refesh_token, {
          refresh_token: localStorage.getItem(refresh_token),
        });

        const newToken = res.data.access_token;
        localStorage.setItem(access_token, newToken);
        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        }

        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem(access_token);
        localStorage.removeItem(refresh_token);
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    const err = errorException(error);
    return Promise.reject(err);
  }
);

export default httpRequest;
