// (예시 서비스)뉴스 서비스.. 
import axios from 'axios';
import { API_BASE_URL } from '../constant/constant';

// 전체 뉴스 게시물 목록 가져오기
export const fetchNewses = async () => {

    try {
        const response = await axios.get(`${API_BASE_URL}/news`); // 스프링 부트의 /news 경로로 GET 요청을 보내기
        console.log("환경변수 잘 갖고오나: ", API_BASE_URL);
        return response.data;
    } catch (error) {
        // 에러 처리
        console.error('뉴스 게시물 불러오는 중 에러 발생', error);
        throw error;
    }
};

// 아이디에 해당하는 뉴스 디테일 정보 가져오기
export const fetchPostDetail = async (newsId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/news/${newsId}`);
        return response.data;
    } catch (error) {
        console.error('뉴스 게시물 상세 정보 로딩 에러', error);
        throw error;
    }
};