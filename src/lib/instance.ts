import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import dayjs from "dayjs";

let authTokens = Cookies.get("token")
  ? JSON.parse(String(Cookies.get("token")))
  : null;

// const isServer = typeof window === "undefined";

const baseURL = "/api";

// const useAxios = () => {
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authTokens?.access}`,
  },
});

// Add an interceptor for checking expiration and refreshing tokens
axiosInstance.interceptors.request.use(
  async (config) => {
    const decodedToken: any = jwt_decode(authTokens?.access);

    // console.log(dayjs.unix(decodedToken.exp).diff(dayjs()) < 1);

    const isExp = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

    if (!isExp) return config;

    const response = await axios.post(`${baseURL}/auth/refresh/user/`, {
      refresh: authTokens.refresh,
    });
    Cookies.set("token", JSON.stringify(response.data));
    config.headers.Authorization = `Bearer ${response.data.access}`;
    return config;
  },
  (error: any) => {
    // Handle any error
    return Promise.reject(error);
  }
);

export default axiosInstance;
// };

// export default useAxios;
