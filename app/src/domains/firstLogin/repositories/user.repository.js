import axios from "axios";
import store from "../../../common/feature/store";
import { setUserInfo } from "../../../common/feature/slices/user.slice";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8443',
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

// 회원 정보 저장
export const saveUserInfo = (userInfo) => {
  return axiosInstance
    .put("/member/info", userInfo)
    .then((response) => {
      store.dispatch(setUserInfo(response.data)); // Redux 스토어에 사용자 정보 저장
      return response.data;
    })
    .catch((error) => {
      console.error("회원 정보 저장 중 에러 발생", error);
      throw error;
    });
};
