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