import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import PrescAddHeader from "./components/presc.add.header";


export default function PrescAddPage() {

  return (
    <div className="relative">
      <PrescAddHeader title="처방 목록 추가" />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[85%] min-h-screen">
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
