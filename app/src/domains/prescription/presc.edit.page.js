import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import PrescEditHeader from "./components/presc.edit.header";
import PrescEdit from "./components/presc.edit";

export default function PrescEditPage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <PrescEditHeader title="처방 정보 수정" />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[85%] min-h-screen">
          <PrescEdit />
        </div>
      </div>

      <BottomNavigation active="2" />
      {/* 배경 */}
      <div className="absolute bottom-0 w-full">
        <div className="relative w-full h-auto bottom-0">
          <img
            src={images.wave}
            alt="Background"
            className="fixed bottom-0 w-full h-60 z-[-1]"
          />
        </div>
      </div>
    </div>
  );
}
