import { get } from "lodash";
import type { InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";

import { type JwtPayload, jwtDecode } from "jwt-decode";
import { StorageUtil } from "@/shared/lib/storage";
import { emitLogoutEvent } from "./logout-emmiter";
import { authService } from "@/services/auth.service";

// for multiple requests
let isRefreshing: boolean = false;
let pendingRequests: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  pendingRequests.forEach((prom) => {
    if (error) {
      prom.reject?.(error);
    } else {
      prom.resolve?.(token);
    }
  });

  pendingRequests = [];
};

export const responseError = (error: any) => {
  const messageData = get(error, "response.data", "");
  const { status = 0 } = error.response || {};
  const originalRequest = error.config;

  if (
    /JsonWebTokenError|TokenExpiredError|ERROR_UNAUTHORIZED/.test(
      messageData
    ) &&
    status > 400 &&
    !originalRequest.retry
  ) {
    const refreshToken = StorageUtil.getRefreshToken();
    if (!refreshToken) {
      emitLogoutEvent();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers!.authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        })
        .catch(Promise.reject);
    }

    originalRequest.retry = true;
    isRefreshing = true;

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = await authService.refreshToken({
          input: { refreshToken },
        });
        originalRequest.headers!.authorization = `Bearer ${accessToken}`;
        StorageUtil.saveAccessToken(accessToken);
        processQueue(null, accessToken);
        resolve(axiosInstance(originalRequest));
      } catch (refreshError) {
        processQueue(refreshError, null);
        emitLogoutEvent();
        reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    });
  }
  return Promise.reject(error);
};

const refreshTokenCallback = async (): Promise<string | null> => {
  try {
    const refreshToken = StorageUtil.getRefreshToken();
    if (!refreshToken) throw new Error("Refresh Token is empty!");

    const { exp } = jwtDecode<JwtPayload>(refreshToken);
    if (new Date(exp! * 1000).getTime() <= Date.now())
      throw new Error("Refresh Token Expired!");

    isRefreshing = true;
    const accessToken = await authService.refreshToken({
      input: { refreshToken },
    });
    StorageUtil.saveAccessToken(accessToken);
    processQueue(null, accessToken);
    return accessToken;
  } catch (error) {
    pendingRequests = [];
    emitLogoutEvent();
    throw error;
  } finally {
    isRefreshing = false;
  }
};

export const requestHeadersSuccess = async (
  config: InternalAxiosRequestConfig
) => {
  const accessToken = StorageUtil.getAccessToken();
  if (!accessToken || ["/auth/refresh-token"].includes(config?.url ?? ""))
    return config;

  const { exp } = jwtDecode<JwtPayload>(accessToken);

  if (new Date(exp! * 1000).getTime() > Date.now()) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  try {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      }).then((newToken) => {
        config.headers!.Authorization = `Bearer ${newToken}`;
        return config;
      });
    }

    const newToken = await refreshTokenCallback();
    if (newToken) config.headers!.Authorization = `Bearer ${newToken}`;
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const requestHeadersError = (error: any) => {
  return Promise.reject(error);
};
