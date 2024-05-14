import React from 'react';
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import EtcPageHeader from "./compoents/etc.page.header";

export default function TermsPage() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // 부드러운 스크롤 효과
        });
    };
    
    return (
        <div className="relative">
            <EtcPageHeader title="서비스 이용 약관" />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">
                    <div className="mt-3">
                        <div className="font-bold mb-3">제 1조(목적)</div>
                        <div className="text-sm mb-6">필팩 서비스 이용약관은 풀스택 1팀인 404-NOTFOUND팀이 제공하는 필팩 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항 등을 규정함을 목적으로 합니다.</div>
                        <div className="font-bold mb-3">제 2조(정의)</div>
                        <div className="text-sm mb-6">1. 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br/>&nbsp;- 내용1<br/>&nbsp;- 내용2</div>
                        <div className="font-bold mb-3">제 3조(약관 등의 명시와 설명 및 개정)</div>
                        <div className="text-sm mb-6">1. 내용...<br/>2. 내용...</div>
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
