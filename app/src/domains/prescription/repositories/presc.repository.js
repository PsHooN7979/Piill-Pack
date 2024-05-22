import axios from 'axios';
import store from '../../../common/feature/store'; // Redux store import

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8443', // 서버의 기본 URL
});

// Axios 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; // Redux store에서 인증 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 처방 정보 추가
export const addPrescription = async (prescriptionData) => {
  try {
    const response = await axiosInstance.post('/presc/add', prescriptionData);
    return response.data;
  } catch (error) {
    console.error('처방 추가 중 오류 발생:', error);
    throw error;
  }
};

// 처방 정보 수정
export const modifyPrescription = async (id, prescriptionData) => {
  try {
    const response = await axiosInstance.post(`/presc/modify/${id}`, prescriptionData);
    return response.data;
  } catch (error) {
    console.error('처방 수정 중 오류 발생:', error);
    throw error;
  }
};

// 모든 처방 정보 가져오기
export const getPrescriptions = async () => {
  try {
    const response = await axiosInstance.get('/presc/info');
    return response.data;
  } catch (error) {
    console.error('처방 정보 가져오기 중 오류 발생:', error);
    throw error;
  }
};

// 특정 처방 정보 삭제
export const deletePrescription = async (id) => {
  try {
    const response = await axiosInstance.delete(`/presc/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('처방 삭제 중 오류 발생:', error);
    throw error;
  }
};

// 약 검색
export const searchMedicine = async (itemName) => {
  const response = await axios.get(`/api/medicine`, {
      params: { item_name: itemName }
  });
  return response.data;
};