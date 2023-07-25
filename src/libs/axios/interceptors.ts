import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const onRequest = (
  value: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { headers } = value;

  headers[`X-Mfeed`] = `Website`;

  if (typeof document !== `undefined`) {
    // const token = readCookie(CookieKey.JwtAuthToken, document.cookie);
    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }
  }

  return { ...value, headers };
};
const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if ([401].includes(error.response?.status ?? 0)) {
    // removeCookie(CookieKey.JwtAuthToken);
    // removeCookie(CookieKey.UserId);
    window.location.href = `/login`;
  }

  return Promise.reject(error);
};

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
