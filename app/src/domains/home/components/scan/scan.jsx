import React from 'react';
import { useNavigate } from 'react-router-dom';
import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined';

export default function Scan() {
  const navigate = useNavigate();

  return (
    <div className="flex p-2 mt-2 rounded border border-gray-300" onClick={() => navigate('/prescription')}>
      <div className="flex flex-col items-center justify-center grow">
        <div className="font-bold text-xs">진단서</div>
        <div className="font-bold text-xs">스캔하기</div>
      </div>
      <CameraAltOutlined className="text-[#00CFAC] w-10 h-10 p-1 ml-3 mr-1 rounded" />
    </div>
  );
}


//버튼 -> 화면 넘기고 -> 카메라를 실행 -> 촬영 앨범 저장 -> 풀 패스를 받고
// -> 바이너리로 읽어오고 -> 네이버 클로바 api (OCR) -> 백엔드에서 ocr로 약 정보 추출(식약처 API) 후 프론트로 전달
// 전달받은 약 정보를 사용자에게 결과 화면
