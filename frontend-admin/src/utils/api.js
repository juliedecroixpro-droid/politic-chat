import axios from 'axios';
import { getAuthHeaders, removeToken } from './auth';

const API_BASE = '/api';

const handleError = (error) => {
  if (error.response?.status === 401) {
    removeToken();
    window.location.href = '/login';
  }
  throw error;
};

export const auth = {
  register: (data) => axios.post(`${API_BASE}/auth/register`, data),
  login: (data) => axios.post(`${API_BASE}/auth/login`, data),
  me: () => axios.get(`${API_BASE}/auth/me`, { headers: getAuthHeaders() }).catch(handleError),
};

export const program = {
  upload: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_BASE}/program/upload`, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress,
    }).catch(handleError);
  },
};

export const agent = {
  updateConfig: (config) => 
    axios.put(`${API_BASE}/agent/config`, config, { headers: getAuthHeaders() }).catch(handleError),
};

export const analytics = {
  overview: () => 
    axios.get(`${API_BASE}/analytics/overview`, { headers: getAuthHeaders() }).catch(handleError),
  conversations: (limit = 50) => 
    axios.get(`${API_BASE}/analytics/conversations?limit=${limit}`, { headers: getAuthHeaders() }).catch(handleError),
  topQuestions: (limit = 10) => 
    axios.get(`${API_BASE}/analytics/top-questions?limit=${limit}`, { headers: getAuthHeaders() }).catch(handleError),
  hourlyActivity: () => 
    axios.get(`${API_BASE}/analytics/hourly-activity`, { headers: getAuthHeaders() }).catch(handleError),
  exportCSV: () => {
    window.open(`${API_BASE}/analytics/export-csv`, '_blank');
  },
};
