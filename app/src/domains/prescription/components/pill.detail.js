import { useLocation } from "react-router-dom";
import React from "react";
import images from "../../../constants/image.constant";

export default function PillDetail() {
  const location = useLocation();
  const { pill } = location.state;

  console.log(pill);
  return (
    <div className="flex flex-col justify-center items-center border  rounded-lg shadow-custom01 my-8">
      <div className="flex flex-col items-center w-full p-4   bg-mint02">
        {/* 이미지 컨테이너 */}
        <div className="p-4">
          <img
            src={pill.itemImage || images.no_img}
            alt={`${pill.itemName} 로고`}
            className="flex-none  overflow-hidden w-20 h-25 bg-white border-2 border-gray-300"
          />
        </div>
        {/* 텍스트 컨테이너 */}
        <div className="flex-grow ml-4 text-center">
          <div className="text-lg font-semibold">{pill.itemName}</div>
          <div className="text-xs">{pill.itemSeq + " / " + pill.entpSeq}</div>
          <div className="text-xs">{pill.entpName}</div>
        </div>
      </div>
      <div className="w-full">
        <div className="relative flex justify-between items-center w-full py-2 bg-white rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <div className="flex flex-col items-start text-sm text-black font-semibold pl-4">
            <span className="ml-1 my-1">{"용도: "}</span>
            <span className="ml-1 my-1" style={{ color: "black" }}>
              {pill.effect}
            </span>
            <span className="ml-1 my-1">{"보관 방법: "}</span>
            <span className="ml-1 my-1" style={{ color: "black" }}>
              {pill.storageMethod}
            </span>
            <span className="ml-1 my-1">{"섭취 방법: "}</span>
            <span className="ml-1 my-1" style={{ color: "black" }}>
              {pill.intakeMethod}
            </span>
          </div>
        </div>
        <div className="relative flex justify-between items-center w-full py-2 bg-white rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.1rem] rounded-lg bg-gray-300"></span>
          <div className="flex flex-col items-start text-sm text-warn02 font-semibold pl-4">
            <span className="ml-1 my-1">{"복용 시 주의 사항: "}</span>
            <span className="ml-1 my-1" style={{ color: "black" }}>
              {pill.precautions}
            </span>
            <span className="ml-1 my-1">{"부작용: "}</span>
            <span className="ml-1 my-1" style={{ color: "black" }}>
              {pill.sideEffect}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
