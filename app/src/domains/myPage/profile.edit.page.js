import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import ProfileEditPageHeader from "./compoents/profile.edit.page.header";

export default function ProfileEditPage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <ProfileEditPageHeader title="내 정보 수정" />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[85%] min-h-screen">
          
        </div>
      </div>

      <BottomNavigation active="4" />
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
