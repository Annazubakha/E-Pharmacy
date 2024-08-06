import axios, { AxiosInstance } from "axios";

interface AxiosConfig {
  baseURL: string;
}

const config: AxiosConfig = {
  baseURL: "https://e-pharmacy-back-14jz.onrender.com/api",
};

export const instance: AxiosInstance = axios.create(config);

export const setToken = (token: string): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = (): void => {
  instance.defaults.headers.common.Authorization = "";
};
