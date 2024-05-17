import axios from 'axios';

export const createUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8443/join', { 
            email, password
        });
        console.error(''); 
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