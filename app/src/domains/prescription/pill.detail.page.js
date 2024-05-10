import { useEffect } from "react";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import PillDetailHeader from "./components/presc.detail.header";
import PillDetail from "./components/pill.detail";

export default function PillDetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="relative">
      <PillDetailHeader title="약 상세 정보" />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[85%] min-h-screen">
          <PillDetail />
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
