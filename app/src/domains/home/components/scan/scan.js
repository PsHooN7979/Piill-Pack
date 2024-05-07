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
