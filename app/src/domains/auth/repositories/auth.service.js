import axios from 'axios';

export const createUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8443/join', { 
            email, password
        });
        console.log('회원가입 응답 데이터', response.data); 
        return response.data;
    } catch (error) {
        console.error('회원가입 중 에러 발생', error);
        throw error;
    }
}

export const tryLogin = async (email, password) => {
    try {
        // 쿼리 스트링 형식으로 요청을 보냄
        const response = await axios.post(`http://localhost:8443/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        return response.data;
    } catch (error) {
        console.error('로그인 중 에러 발생', error);
        throw error;
    }
}

export const fetchUserInfo = async () => {
    try {
        const response = await axios.get(`http://localhost:8443/patientInfo`);
        return response.data;
    } catch (error) {
        console.error('유저 로딩 중 에러 발생', error);
        throw error;
    }
};