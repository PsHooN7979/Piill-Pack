import React from 'react';
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import EtcPageHeader from "./compoents/etc.page.header";

export default function PrivacyPage() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 부드러운 스크롤 효과
        });
    };
    
    return (
        <div className="relative">
            <EtcPageHeader title="개인정보 처리 방침" />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">
                    <div className="mt-3">
                        <div className="font-bold mb-3">1. 개인정보 처리 방침</div>
                        <div className="text-sm mb-6">개인정보 처리방침은 404-NOTFOUND팀이 특정한 가입절차를 거친 이용자들만 이용가능한...</div>
                        <div className="font-bold mb-3">2. 수집하는 개인정보의 항목</div>
                        <div className="text-sm">저희 팀은 서비스 제공을 위해 다음 항목 중 최소한의 개인정보를 수집합니다.</div>
                        <div className="text-sm font-bold">1) 회원가입 시 수집되는 개인정보</div>
                        <div className="text-sm mb-6">이메일, 비밀번호, 성별 .... 정보</div>
                        <div className="font-bold mb-3">3. 수집한 개인정보의 처리 목적</div>
                        <div className="text-sm mb-6">수집된 개인정보는 다음의 목적에 한해 이용됩니다.<br/>...</div>
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
