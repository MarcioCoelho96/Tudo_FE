import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  create,
} from "axios";
import * as SecureStore from "expo-secure-store";

// Extend Axios's custom config interface so TS knows about our custom retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Queue item blueprint for handling concurrent 401 stalls
interface FailedRequestQueueItem {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

const api: AxiosInstance = create({
  baseURL: "https://tudo.bestrytech.com",
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: FailedRequestQueueItem[] = [];

const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// 1. REQUEST INTERCEPTOR
api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 2. RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Prevent crashing if the request details are completely missing or malformed
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refresh_token");

        // Ensure you don't track interceptor updates on the refresh call itself
        const response = await axios.post<{
          accessToken: string;
          refreshToken?: string;
        }>("https://api.yourdomain.com/auth/refresh", { refreshToken });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        await SecureStore.setItemAsync("access_token", newAccessToken);
        if (newRefreshToken) {
          await SecureStore.setItemAsync("refresh_token", newRefreshToken);
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("refresh_token");

        // Optional: Trigger a logout hook or event-emitter redirect to Login here

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
