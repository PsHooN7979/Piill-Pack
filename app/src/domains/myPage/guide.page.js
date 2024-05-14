import React from 'react';
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import EtcPageHeader from "./compoents/etc.page.header";

export default function GuidePage() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 부드러운 스크롤 효과
        });
    };
    
    return (
        <div className="relative">
            <EtcPageHeader title="이용 안내" />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">
                    <div className="mt-3">
                        <div className="font-bold mb-3">서비스 안내</div>
                        <div className="text-sm mb-6">서비스 내용...</div>
                        <div className="font-bold mb-3">처방전 등록 방법</div>
                        <div className="text-sm mb-6">처방전 등록 방법에 대한 내용...</div>
                        <div className="font-bold mb-3">기타</div>
                        <div className="text-sm mb-6">기타 내용...</div>
                    </div>
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

                {/* 플로팅 버튼 */}
                <button
                    onClick={scrollToTop}
                    className="fixed right-2 bottom-28 bg-transparent text-gray-700 font-bold p-1 rounded-full border border-gray-400 shadow-lg transition-transform duration-200 hover:scale-110"
                >
                    🔝
                </button>
            </div>
        </div>
    );
}
