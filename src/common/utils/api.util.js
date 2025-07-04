import axios, { HttpStatusCode } from 'axios';
import { delay } from './common.util';
import { getUserInfo } from 'common/reducers/user/user.action';
import { store } from 'reduxApp/store';

const { VITE_API_URL: API_URL, VITE_APP_PREFIX: APP_PREFIX, VITE_WEBPAGE_KEY: WEBPAGE_KEY } = import.meta.env;

const createAxios = () =>
  axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'x-webpage-key': WEBPAGE_KEY,
    },
    timeout: 10000,
    withCredentials: true,
  });

const api = createAxios();
const refreshApi = createAxios();

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

const refreshTokenState = {
  promise: null,
  retryCount: 0,
};

const refreshToken = async () => {
  try {
    if (refreshTokenState.retryCount >= MAX_RETRIES) {
      refreshTokenState.promise = null;
      refreshTokenState.retryCount = 0;
      throw new Error('Max refresh token retries!');
    }

    if (refreshTokenState.promise) {
      return refreshTokenState.promise;
    }

    refreshTokenState.retryCount++;

    refreshTokenState.promise = refreshApi.get(`/auth/refresh-token`);
    const { errors, data } = await refreshTokenState.promise;
    if (errors) throw new Error(errors.toString());
    await store.dispatch(getUserInfo());
    window.location.href = APP_PREFIX;
    return data;
  } catch (error) {
    if (refreshTokenState.retryCount < MAX_RETRIES) {
      await delay(RETRY_DELAY);
      refreshTokenState.promise = null;
      return refreshToken();
    }
    throw error;
  }
};

api.interceptors.request.use((req) => {
  return req;
});

api.interceptors.response.use(
  ({ data, status }) => {
    const result = { data, status };
    if (data instanceof Blob) return result;
    const { data: dataResult, ...resultRemain } = result;
    return { ...dataResult, ...resultRemain };
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    originalRequest._retry = (originalRequest._retry || 0) + 1;

    const { data, status } = error.response;
    const shouldRefreshToken = status === HttpStatusCode.Unauthorized;
    if (!shouldRefreshToken) return { ...data, status };

    try {
      const newToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      await delay(RETRY_DELAY);
      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export { api };
