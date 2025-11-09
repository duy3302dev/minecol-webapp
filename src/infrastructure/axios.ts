import axios from "axios";
import {
  requestHeadersError,
  requestHeadersSuccess,
  responseError,
} from "./interceptors";
import { appConfig } from "@/configs/app.config";

const axiosInstance = axios.create({
  baseURL: appConfig.apiUrl, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// You can add interceptors here if you need to handle requests or responses globally
axiosInstance.interceptors.request.use(
  requestHeadersSuccess,
  requestHeadersError
);

axiosInstance.interceptors.response.use((response) => {
  // Do something with response data
  return response;
}, responseError);

export const setAxiosCustomHeader = (header: string, value: string | null) => {
  if (value) {
    axiosInstance.defaults.headers.common[header] = value;
  } else {
    delete axiosInstance.defaults.headers.common[header];
  }
};

export const getAxiosCustomHeader = (header: string) => {
  return axiosInstance.defaults.headers.common[header];
};

export const setAccessToken = (token: string) => {
  return setAxiosCustomHeader("Authorization", `Bearer ${token}`);
};

export const getAccessToken = () => {
  return getAxiosCustomHeader("Authorization");
};

export { axiosInstance };
