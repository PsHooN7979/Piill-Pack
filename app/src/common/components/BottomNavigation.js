import React from "react";
import { useNavigate } from "react-router-dom";
import uis from "../../constants/ui.constant";

// 바텀 네비게이션 사용방법 <BottomNavigation active="숫자(1,2,3,4)" />
function BottomNavigation({ active }) {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-md flex justify-around items-center py-2 z-50">
      <button
        className={`flex flex-col items-center ${
          active === "1" ? "text-gray-900" : "text-gray-400"
        }`}
        onClick={() => navigate("/home")}
      >
        <img
          src={active === "1" ? uis.home_active : uis.home}
          alt="Home"
          className={active === "1" ? "w-5 h-5 drop-shadow-custom2" : "w-5 h-5"}
        />
        <div
          className={
            active === "1" ? "text-xs text-shadow-custom02" : "text-xs"
          }
        >
          홈
        </div>
      </button>
      <button
        className={`flex flex-col items-center ${
          active === "2" ? "text-gray-900" : "text-gray-400"
        }`}
        onClick={() => navigate("/prescription")}
      >
        <img
          src={active === "2" ? uis.invoice_active : uis.invoice}
          alt="PrescriptionList"
          className={active === "2" ? "w-5 h-5 drop-shadow-custom2" : "w-5 h-5"}
        />
        <div
          className={
            active === "2" ? "text-xs text-shadow-custom02" : "text-xs"
          }
        >
          처방 목록
        </div>
      </button>
      <button
        className={`flex flex-col items-center ${
          active === "3" ? "text-gray-900" : "text-gray-400"
        }`}
        onClick={() => navigate("/health")}
      >
        <img
          src={active === "3" ? uis.heart_active : uis.heart}
          alt="Health"
          className={active === "3" ? "w-5 drop-shadow-custom2" : "w-5"}
        />
        <div
          className={
            active === "3" ? "text-xs text-shadow-custom02" : "text-xs"
          }
        >
          건강 상태
        </div>
      </button>
      <button
        className={`flex flex-col items-center ${
          active === "4" ? "text-gray-900" : "text-gray-400"
        }`}
        onClick={() => navigate("/profile")}
      >
        <img
          src={active === "4" ? uis.person_active : uis.person}
          alt="Profile"
          className={active === "4" ? "w-6 h-6 drop-shadow-custom2" : "w-5 h-5"}
        />
        <div
          className={
            active === "4" ? "text-xs text-shadow-custom02" : "text-xs"
          }
        >
          내 정보
        </div>
      </button>
    </div>
  );
}

export default BottomNavigation;
