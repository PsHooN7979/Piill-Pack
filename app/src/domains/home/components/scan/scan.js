import React from "react";
import { useNavigate } from "react-router-dom";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import { useDispatch } from "react-redux";
import {
  setNativeState,
  setCameraState,
  setReadState,
} from "../../../../common/feature/slices/native.slice";
import Native from "../../../../constants/constant";

export default function Scan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scannerHandler = () => {
    dispatch(setNativeState(Native.Init));
    dispatch(setCameraState(Native.CameraOff));
    dispatch(setReadState(Native.ReadOff));
    navigate("/prescription");
  };

  return (
    <div
      onClick={scannerHandler}
      className="flex items-center p-1 mt-2 rounded border border-gray-300 transition duration-300 ease-in-out transform active:scale-95 active:bg-mint01"
    >
      <div className="flex flex-col items-center justify-center grow ml-1">
        <div className="font-bold text-xxs">처방전</div>
        <div className="font-bold text-xxs">스캔하기</div>
      </div>
      <CameraAltOutlined className=" text-mint03 w-6 h-6 ml-2 mr-1 rounded" />
    </div>
  );
}

//버튼 -> 화면 넘기고 -> 카메라를 실행 -> 촬영 앨범 저장 -> 풀 패스를 받고
// -> 바이너리로 읽어오고 -> 네이버 클로바 api (OCR) -> 백엔드에서 ocr로 약 정보 추출(식약처 API) 후 프론트로 전달
// 전달받은 약 정보를 사용자에게 결과 화면
