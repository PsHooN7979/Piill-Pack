import axios from "axios";
import store from "../../../common/feature/store";
import { setIsAuth } from "../../../common/feature/slices/auth.slice";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  // baseURL: "http://10.0.2.2:8443",
  baseURL: "http://127.0.0.1:8443",
  // baseURL: "http://192.168.1.106:8443",
});

// Axios 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createUser = async (email, password) => {
  try {
    const response = await axios.post("/auth/register", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tryLogin = async (email, password) => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    const accessToken = response.headers["access-token"];
    const refreshToken = response.headers["refresh-token"];

    if (accessToken) {
      console.log(accessToken);
      store.dispatch(setIsAuth({ isAuth: true, accessToken: accessToken }));
    } else {
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/patient/info");
    return response.data;
  } catch (error) {
    throw error;
  }
};
