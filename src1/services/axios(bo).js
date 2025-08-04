// services/axios.js

import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// Cấu hình cơ bản
const API_URL = apiUrl || "https://your-api.com"; // baseURL
const REQUEST_HEADER = {
  "Content-Type": "application/json",
  Accept: "application/json",
  // Thêm token nếu có
};

// Tạo instance axios
const httpRequest = axios.create({
  baseURL: API_URL,
  timeout: 300000, // 5 phút
  headers: REQUEST_HEADER,
});


httpRequest.interceptors.request.use(
  (config) => {
    // Ví dụ: thêm token từ localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ghi log hoặc tracking request ở đây nếu muốn
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);