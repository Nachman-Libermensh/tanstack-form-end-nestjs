/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */

import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL env variable is not defined");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  get(endpoint: string, data?: any) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint: string, data?: any) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint: string, data?: any) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint: string, data?: any) {
    return ajax(endpoint, "DELETE", data);
  },
  patch(endpoint: string, data?: any) {
    return ajax(endpoint, "PATCH", data);
  },
};

async function ajax(endpoint: string, method = "get", data = null) {
  try {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${BASE_URL}${endpoint}`;
    const res = await axiosInstance({
      url,
      method,
      data,
      params: method === "GET" ? data : null,
    });
    return res.data;
  } catch (err: unknown) {
    // console.log(err?.response?.data);
    if (err instanceof AxiosError) {
      throw err;
    }
    throw err;
  }
}
