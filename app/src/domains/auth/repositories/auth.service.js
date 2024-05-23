import axios from "axios";
import store from "../../../common/feature/store";
import { setIsAuth } from "../../../common/feature/slices/auth.slice";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  // baseURL: "http://10.0.2.2:8443",
  // baseURL: "http://localhost:8443",
  baseURL: "http://192.168.1.106:8443",
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
    const response = await axiosInstance.post("/join", { email, password });
    console.log("회원가입 응답 데이터", response.data);
    return response.data;
  } catch (error) {
    console.error("회원가입 중 에러 발생", error);
    throw error;
  }
};

export const tryLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post(
      `/login?username=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`
    );
    console.log("로그인 응답 데이터:", response.data); // 로그인 응답 데이터 확인
    const token = response.data.token;
    if (token) {
      store.dispatch(setIsAuth({ isAuth: true, token }));
    } else {
      console.error("로그인 응답에 토큰이 없습니다."); // 토큰이 없는 경우 에러 로그
    }
    return response.data;
  } catch (error) {
    console.error("로그인 중 에러 발생", error);
    throw error;
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/patientInfo");
    return response.data;
  } catch (error) {
    console.error("유저 로딩 중 에러 발생", error);
    throw error;
  }
};
