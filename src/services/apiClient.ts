import axios from 'axios';
import { log } from './logger';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_ACCESS_TOKEN;

if (!baseURL) {
  log('frontend', 'fatal', 'config', 'VITE_API_BASE_URL is not configured.');
}

if (!token) {
  log('frontend', 'fatal', 'config', 'VITE_ACCESS_TOKEN is not configured.');
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    log('frontend', 'debug', 'api', `Request: [${config.method?.toUpperCase()}] ${config.url}`);
    return config;
  },
  (error) => {
    log('frontend', 'error', 'api', `Request failure: ${error}`);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    log('frontend', 'debug', 'api', `Response: [${response.status}] ${response.config.url}`);
    return response;
  },
  (error) => {
    log('frontend', 'error', 'api', `Response failure: ${error?.response?.status} ${error?.config?.url}`);
    return Promise.reject(error);
  }
);
