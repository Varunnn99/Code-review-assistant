import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const uploadCode = (formData) => API.post('/review/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const getReports = () => API.get('/review/reports');
export const getReportById = (id) => API.get(`/review/reports/${id}`);
export const anonymousUploadCode = (formData) => API.post('/review/anonymous-upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });